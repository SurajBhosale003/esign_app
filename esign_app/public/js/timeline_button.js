// Timeline button for Frappe
$(document).on("app_ready", function () {
  $.each(frappe.boot.user.can_read, function (i, doctype) {
    let buttonAdded = false;

    frappe.ui.form.on(doctype, {
      refresh: function (frm) {
   
        if (!frm.is_new()) {
          if (frm.footer?.frm?.timeline && !buttonAdded) {
            let send_esign = async () => {         
                let userEmailList = [];
                try {
                  const res = await frappe.call({
                    method: "frappe.client.get_list",
                    args: {
                      doctype: "User",
                      filters: { enabled: 1 },
                      fields: ["email"],
                      limit_page_length: 1000,
                    },
                  });
        
                  userEmailList = res.message.map((user) => user.email);
                } catch (e) {
                  console.error("Failed to fetch user emails:", e);
                }
              
                console.log("===",userEmailList)


              let user = frappe.session.user;
              let userDetails = await frappe.db.get_value("User", user, ["full_name", "email"]);
              let doctype = frm.doctype;
              let docname = frm.docname;
              let fullName = userDetails?.message?.full_name || "Unknown User";
              let email = userDetails?.message?.email || "No Email";

              let templates = [];
              try {
                let response = await fetch(`/api/method/esign_app.api.get_templetes_for_doctype?user_mail=${email}&requesting_doctype=${doctype}`);
                let data = await response.json();
                if (data.message?.status === 200 && Array.isArray(data.message.data)) {
                  templates = data.message.data.map((temp) => ({
                    label: temp.templete_title.trim(),
                    value: temp.name.trim(),
                  }));
                }
              } catch (error) {
                console.error("Error fetching templates:", error);
              }

              let templateOptions = {};
              if (templates.length) {
                templateOptions = Object.fromEntries(templates.map((t) => [t.label, t.value]));
              }

              let dialog = new frappe.ui.Dialog({
                title: "Send to eSign",
                fields: [
                  {
                    fieldname: "user_details",
                    label: "User Details",
                    fieldtype: "HTML",
                    options: `<div style="font-family: 'Arial'; font-size: 16px; line-height: 1.6; color: #333; background: #f9f9f9; padding: 15px 20px; border: 1px solid #ddd; border-radius: 10px; max-width: 400px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                                <p style="margin: 0 0 5px; font-weight: 600; font-size: 18px; color: #222;">${fullName}</p>
                                <p style="margin: 0; font-size: 14px; color: #555;">${email}</p>
                              </div><br/>`
                  },
                  {
                    fieldname: "custom_docname",
                    label: "Enter Name",
                    default: docname,
                    fieldtype: "Data",
                    reqd: 1,
                  },
                  {
                    fieldname: "letterhead",
                    label: "Select Letter Head",
                    fieldtype: "Link",
                    options: "Letter Head",
                    default: frappe.defaults.get_default("letter_head") || "No Letterhead",
                  },
                  {
                    fieldname: "print_format",
                    label: "Select Print Format",
                    fieldtype: "Link",
                    options: "Print Format",
                    default: frappe.defaults.get_default("print_format") || "Standard",
                    get_query: function () {
                      return {
                        filters: { doc_type: cur_frm.doc.doctype },
                      };
                    },
                  },
                  {
                    fieldname: "template_select",
                    label: "Select Template",
                    fieldtype: "Link",
                    options: "TempleteList",
                    reqd: 1,
                    get_query() {
                      return {
                        filters: {
                          name: ["in", Object.values(templateOptions)],
                        },
                      };
                    },
                  },
                  {
                    fieldname: "assignments",
                    label: "Component Assignments",
                    fieldtype: "Table",
                    cannot_add_rows: true,
                    in_list_view: 0,
                    depends_on: "eval:doc.template_select",
                    fields: [
                      {
                        fieldname: "component",
                        label: "Component",
                        fieldtype: "Data",
                        read_only: 1,
                        in_list_view: 1,
                      },
                      {
                        fieldname: "email",
                        label: "Assign To",
                        fieldtype: "Autocomplete",
                        options: userEmailList,
                        in_list_view: 1,
                      },
                    ],
                  },
                ],
                secondary_action_label: "Assign & Send",
                secondary_action: async () => {
                  frappe.show_alert({ message: "Processing...", indicator: "orange" });
                  try {
                    const templateSelected = dialog.get_value("template_select");
                    const printFormat = dialog.get_value("print_format") || "Standard";
                    const letterhead = dialog.get_value("letterhead") || "No Letterhead";
                    const customDocname = dialog.get_value("custom_docname");
                    const updatedAssignments = dialog.get_value("assignments");
                
                    let updatedComponentData = JSON.parse(JSON.stringify(dialog.componentData));
                    updatedComponentData.forEach((component) => {
                      const updated = updatedAssignments.find((row) => row.component === component.name);
                      if (updated) {
                        component.assign = updated.email ? [updated.email] : [];
                      }
                    });
                
                    // === PDF URL generation ===
                    const doctype = cur_frm.doc.doctype;
                    const docname = cur_frm.doc.name;
                    const noLetterhead = letterhead === "No Letterhead" ? 1 : 0;
                    const printFormatORG = printFormat || "Standard";
                    console.log("printFormat", printFormat, "noLetterhead", noLetterhead, "letterhead", letterhead);
                    const pdfUrl = `/api/method/frappe.utils.print_format.download_pdf?doctype=${doctype}&name=${docname}&format=${printFormatORG}&no_letterhead=${noLetterhead}&letterhead=${encodeURIComponent(letterhead)}&settings=%7B%7D&_lang=en`;
                    
                    // === Fetch and Convert PDF to Base64 ===
                    const fetchPdfBase64 = async (url) => {
                      try {
                        const response = await fetch(url);
                        const blob = await response.blob();
                        return new Promise((resolve, reject) => {
                          const reader = new FileReader();
                          reader.readAsDataURL(blob);
                          reader.onloadend = () => resolve(reader.result.split(",")[1]);
                          reader.onerror = (err) => reject(err);
                        });
                      } catch (err) {
                        console.error("Error fetching PDF:", err);
                        return null;
                      }
                    };
                
                    const pdfBase64 = await fetchPdfBase64(pdfUrl);
                
                    if (!pdfBase64) {
                      frappe.msgprint({
                        title: "Error",
                        message: "Failed to fetch and convert PDF!",
                        indicator: "red",
                      });
                      return;
                    }
                    // Call new backend API
                    console.log("email---====+++>", email)
                    frappe.call({
                      method: "esign_app.api.create_updated_document",
                      args: {
                        custom_docname: customDocname,
                        selectedValue: templateSelected,
                        pdfBase64: pdfBase64,
                        email: email,
                        updatedComponentData: updatedComponentData,
                      },
                      callback: function (response) {
                        if (response.message?.status === 200) {
                          frappe.hide_progress();
                          frappe.msgprint({
                            title: "Success",
                            message: "Document Created Successfully!",
                            indicator: "green",
                          });
                        } else {
                          frappe.msgprint({
                            title: "Error",
                            message: response.message?.error || "Something went wrong!",
                            indicator: "red",
                          });
                        }
                      },
                      error: function (error) {
                        frappe.hide_progress();
                        frappe.msgprint({
                          title: "Error",
                          message: "Failed to create the document!",
                          indicator: "red",
                        });
                        console.error("API Call Failed:", error);
                      },
                    });

                    dialog.hide();
                  } catch (error) {
                    console.error("Error in secondary action submit:", error);
                    frappe.msgprint("Error submitting data.");
                  }
                },
                
                
                primary_action_label: "Save as Draft",
                primary_action: async (values) => {
                  frappe.show_alert({ message: "Processing...", indicator: "orange" });

                  function getPDFUrl() {
                    let doctype = cur_frm.doc.doctype;
                    let docname = cur_frm.doc.name;
                    let printFormat = values.print_format || "Standard";
                    let letterhead = values.letterhead || "No Letterhead";
                    let noLetterhead = letterhead === "No Letterhead" ? 1 : 0;

                    return `/api/method/frappe.utils.print_format.download_pdf?doctype=${doctype}&name=${docname}&format=${printFormat}&no_letterhead=${noLetterhead}&letterhead=${encodeURIComponent(letterhead)}&settings=%7B%7D&_lang=en`;
                  }

                  let pdfBase64 = await (async function fetchPdfBase64(url) {
                    try {
                      let response = await fetch(url);
                      let blob = await response.blob();
                      return new Promise((resolve, reject) => {
                        let reader = new FileReader();
                        reader.readAsDataURL(blob);
                        reader.onloadend = () => resolve(reader.result.split(",")[1]);
                        reader.onerror = (error) => reject(error);
                      });
                    } catch (error) {
                      console.error("Error fetching PDF:", error);
                      return null;
                    }
                  })(getPDFUrl());

                  if (!pdfBase64) {
                    frappe.msgprint({
                      title: "Error",
                      message: "Failed to fetch and convert PDF!",
                      indicator: "red",
                    });
                    return;
                  }

                  frappe.call({
                    method: "esign_app.api.fetch_and_print_data",
                    args: {
                      custom_docname: values.custom_docname,
                      selectedValue: values.template_select,
                      pdfBase64: pdfBase64,
                      email: email,
                      assignments: values.assignments || [],
                    },
                    callback: function (response) {
                      if (response.message?.status === 200) {
                        frappe.hide_progress();
                        frappe.msgprint({
                          title: "Success",
                          message: "Document Created Successfully!",
                          indicator: "green",
                        });
                      } else {
                        frappe.msgprint({
                          title: "Error",
                          message: response.message?.error || "Something went wrong!",
                          indicator: "red",
                        });
                      }
                    },
                    error: function (error) {
                      frappe.hide_progress();
                      frappe.msgprint({
                        title: "Error",
                        message: "Failed to create the document!",
                        indicator: "red",
                      });
                      console.error("API Call Failed:", error);
                    },
                  });

                  dialog.hide();
                },
              });

              dialog.show();

              dialog.fields_dict.template_select.df.onchange = async function () {
                const selectedTemplate = dialog.get_value("template_select");
                if (!selectedTemplate) return;

                try {
                  let response = await frappe.call({
                    method: "frappe.client.get_value",
                    args: {
                      doctype: "TempleteList",
                      filters: { name: selectedTemplate },
                      fieldname: "templete_json_data",
                    },
                  });

                  let templateData = response.message?.templete_json_data;
                  if (templateData) {
                    let parsed = JSON.parse(templateData);
                    console.log(parsed)
                    let assignmentTable = dialog.fields_dict.assignments.grid;
                    assignmentTable.df.data = [];
                    parsed.forEach((item) => {
                      assignmentTable.df.data.push({
                        component: item.name,
                        email: item.assign?.[0] || "",
                      });
                    });
                    assignmentTable.refresh();
                    dialog.componentData = parsed;
                  }
                } catch (error) {
                  console.error("Error fetching template data:", error);
                }
              };
            };

            var timeline = frm.footer.frm.timeline;
            timeline.add_action_button(
              __("Send to Esign"),
              send_esign,
              "share",
              "btn-secondary send-raven-button"
            );

            buttonAdded = true;
          }
        }
      },
    });
  });
});
