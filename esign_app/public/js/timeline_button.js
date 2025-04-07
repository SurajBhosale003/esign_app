// Timeline button for Frappe
$(document).on("app_ready", function () {
  $.each(frappe.boot.user.can_read, function (i, doctype) {
    let buttonAdded = false;

    frappe.ui.form.on(doctype, {
      refresh: function (frm) {
        if (!frm.is_new()) {
          if (frm.footer?.frm?.timeline && !buttonAdded) {
            let send_esign = async () => {
              let user = frappe.session.user;
              let userDetails = await frappe.db.get_value("User", user, ["full_name", "email"]);
              let doctype = frm.doctype;
              let docname = frm.docname;
              let fullName = userDetails?.message?.full_name || "Unknown User";
              let email = userDetails?.message?.email || "No Email";

              let templates = [];
              try {
                let response = await fetch(`/api/method/esign_app.api.get_templetes?user_mail=${email}`);
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
                  },
                  {
                    fieldname: "print_format",
                    label: "Select Print Format",
                    fieldtype: "Link",
                    options: "Print Format",
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
                        fieldtype: "Link",
                        options: "User",
                        in_list_view: 1,
                      },
                    ],
                  },
                ],
                primary_action_label: "Save as Doc",
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
                    let assignmentTable = dialog.fields_dict.assignments.grid;
                    assignmentTable.df.data = [];
                    parsed.forEach((item) => {
                      assignmentTable.df.data.push({
                        component: item.name,
                        email: item.assign?.[0] || "",
                      });
                    });
                    assignmentTable.refresh();
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


// // Timeline button for Frappe
// $(document).on("app_ready", function () {
//   $.each(frappe.boot.user.can_read, function (i, doctype) {
//     let buttonAdded = false; // Track if the button has been added

//     frappe.ui.form.on(doctype, {
//       refresh: function (frm) {
//         if (!frm.is_new()) {
//           if (frm.footer?.frm?.timeline && !buttonAdded) {
//             // Function to open the popup
//             let send_esign = async () => {
//               console.log('inside send button')
//               let user = frappe.session.user;
//               console.log('got user section',user)
//               let userDetails = await frappe.db.get_value("User", user, [
//                 "full_name",
//                 "email",
//               ]);
//               console.log('got user details section',userDetails)
//               let doctype = frm.doctype;
//               console.log('got doctype ',doctype)
//               let docname = frm.docname;
//               console.log('got docname ',docname)
//               let fullName = userDetails?.message?.full_name || "Unknown User";
//               let email = userDetails?.message?.email || "No Email";
              
//               let templates = [];
//               try {
//                 let response = await fetch(
//                   `/api/method/esign_app.api.get_templetes?user_mail=${email}`
//                 );
//                 let data = await response.json();
//                 console.log('got response',data)
//                 if (data.message?.status === 200 && Array.isArray(data.message.data)) {
//                   templates = data.message.data.map((temp) => ({
//                     label: temp.templete_title.trim(), 
//                     value: temp.name.trim(),
//                   }));
//                 }
//               } catch (error) {
//                 console.error("Error fetching templates:", error);
//               }

//               console.log("Fetched Templates:", templates);
//               let templateOptions = {};
//               if (templates.length) {
//                 templateOptions = Object.fromEntries(templates.map((t) => [t.label, t.value]));
//               }
//               console.log("*************************",Object.keys(templateOptions))
//               // show the dialog box 
//               let dialog = new frappe.ui.Dialog({
//                 title: "Send to eSign test",
//                 fields: [
//                   {
//                     fieldname: "user_details",
//                     label: "User Details",
//                     fieldtype: "HTML",
//                     options: `<div style="
//                               font-family: 'Arial', sans-serif;
//                               font-size: 16px;
//                               line-height: 1.6;
//                               color: #333;
//                               background: #f9f9f9;
//                               padding: 15px 20px;
//                               border: 1px solid #ddd;
//                               border-radius: 10px;
//                               max-width: 400px;
//                               box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//                           ">
//                               <p style="
//                                   margin: 0 0 5px;
//                                   font-weight: 600;
//                                   font-size: 18px;
//                                   color: #222;
//                               ">
//                                   ${fullName}
//                               </p>
//                               <p style="
//                                   margin: 0;
//                                   font-size: 14px;
//                                   color: #555;
//                               ">
//                                   ${email}
//                               </p>
//                           </div>
//                           </br>
//                           `,
//                   },
//                   {
//                     fieldname: "custom_docname",
//                     label: "Enter Name",
//                     default: docname,
//                     fieldtype: "Data",
//                     reqd: 1,
//                   },{
//                     fieldname: "letterhead",
//                     label: "Select Letter Head",
//                     fieldtype: "Link",
//                     options: "Letter Head",
//                   },
//                 {
//                     fieldname: "print_format",
//                     label: "Select Print Format",
//                     fieldtype: "Link",
//                     options: "Print Format",
//                     get_query: function () {
//                         return {
//                             filters: {
//                                 "doc_type": cur_frm.doc.doctype // Show Print Formats specific to this Doctype
//                             }
//                         };
//                     }
//                 },
//                   {
//                     fieldname: "template_select",
//                     label: "Select Template",
//                     fieldtype: "Link",
//                     options: "TempleteList", // The doctype where templates are stored
//                     get_query() {
//                       return {
//                         filters: {
//                           name: ["in", Object.values(templateOptions)], // Filtering only the fetched templates
//                         }
//                       };
//                     }
//                   },
                  
//                 ],
//                 primary_action_label: "Save as Doc",
//                 primary_action: async (values) => {
//                   frappe.show_alert({ message: "Processing...", indicator: "orange" });
//                   console.log("LLLLLKKLKLKL",values.print_format, values.letterhead )
//                   function getPDFUrl() {
//                     let doctype = cur_frm.doc.doctype;
//                     let docname = cur_frm.doc.name;
                    
//                     let printFormat = values.print_format || "Standard"; // Default to "Standard" if not selected
//                     let letterhead = values.letterhead || "No Letterhead"; // Default if not selected
//                     let noLetterhead = letterhead === "No Letterhead" ? 1 : 0; // Set `no_letterhead=1` if no letterhead is selected
                
//                     let pdfUrl = `/api/method/frappe.utils.print_format.download_pdf?doctype=${doctype}&name=${docname}&format=${printFormat}&no_letterhead=${noLetterhead}&letterhead=${encodeURIComponent(letterhead)}&settings=%7B%7D&_lang=en`;
                
//                     return pdfUrl;
//                   }
//                   let pdfUrl = getPDFUrl();
//                   console.log(pdfUrl);
//                   // let pdfUrl = `/api/method/frappe.utils.print_format.download_pdf?doctype=${doctype}&name=${docname}&format=Standard&no_letterhead=1&letterhead=No%20Letterhead&settings=%7B%7D&_lang=en`;
//                   console.log("PDF URL Loaded:", pdfUrl);
              
//                   // Function to fetch PDF and convert it to base64
//                   async function fetchPdfBase64(url) {
//                       try {
//                           let response = await fetch(url);
//                           let blob = await response.blob();
//                           return new Promise((resolve, reject) => {
//                               let reader = new FileReader();
//                               reader.readAsDataURL(blob);
//                               reader.onloadend = () => resolve(reader.result.split(",")[1]);
//                               reader.onerror = (error) => reject(error);
//                           });
//                       } catch (error) {
//                           console.error("Error fetching PDF:", error);
//                           return null;
//                       }
//                   }
              
//                   // Wait for the base64 conversion to complete
//                   let pdfBase64 = await fetchPdfBase64(pdfUrl);
//                   if (!pdfBase64) {
//                       frappe.msgprint({
//                           title: "Error",
//                           message: "Failed to fetch and convert PDF!",
//                           indicator: "red",
//                       });
//                       return;
//                   }
              
//                   console.log("PDF Base64:", pdfBase64);
              
//                   let selectedLabel = values.template_select;
//                   console.log("User Email:", email);
              
//                   // Show Frappe loading spinner
                 
              
//                   frappe.call({
//                       method: "esign_app.api.fetch_and_print_data",
//                       args: {
//                           custom_docname: values.custom_docname,
//                           selectedValue: selectedLabel,
//                           pdfBase64: pdfBase64,
//                           email: email,
//                       },
//                       callback: function (response) {
//                           if (response.message && response.message.status === 200) {
//                               frappe.hide_progress();
//                               frappe.msgprint({
//                                   title: "Success",
//                                   message: "Document Created Successfully!",
//                                   indicator: "green",
//                               });
//                           } else {
//                               frappe.msgprint({
//                                   title: "Error",
//                                   message: response.message?.error || "Something went wrong!",
//                                   indicator: "red",
//                               });
//                           }
//                       },
//                       error: function (error) {
//                           frappe.hide_progress();
//                           frappe.msgprint({
//                               title: "Error",
//                               message: "Failed to create the document!",
//                               indicator: "red",
//                           });
//                           console.error("API Call Failed:", error);
//                       },
//                   });
              
//                   dialog.hide();
//                 },
//                 secondary_action_label: "Submit",
//                 secondary_action: async (values) => {
//                   // console.log("Sec Button")
//                 },
//               });
              
//               dialog.show();
//             };

//             var timeline = frm.footer.frm.timeline;
//             timeline.add_action_button(
//               __("Send to Esign"),
//               send_esign,
//               "share",
//               "btn-secondary send-raven-button"
//             );

//             buttonAdded = true;
//           }
//         }
//       },
//     });
//   });
// });
