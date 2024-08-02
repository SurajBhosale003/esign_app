import frappe
import json 
from datetime import datetime
# ++++ Save or Create User ++++++++++++
@frappe.whitelist(allow_guest= True)
def create_user(fullName,password,email):
    try:
        doc = frappe.get_doc({'doctype':'User'})
        doc.email=email
        doc.first_name=fullName
        doc.full_name=fullName
        doc.username=fullName
        doc.new_password=password
        doc.role_profile_name="esign"
        doc.send_welcome_email=0
        doc.insert()
        print("try"*40)
        return {'status':200,'message':'User created successfully'}
    except Exception as e:
        print("exception"*30)
        return {'status':500,'message':str(e)}
# ++++ Save or Create User End ++++++++++++

# Signature API's_______________________________________________________________________________________________________________________________________________
# ++++ Save Signature ++++++++++++
@frappe.whitelist(allow_guest= True)
def save_signature(signature_data, signature_name, user_full_name, user_email):
    try:
        doc=frappe.get_doc({'doctype':'Esign_signature'})
        doc.sign_blob=signature_data
        doc.sign_name=signature_name
        doc.user_name=user_full_name
        doc.user_mail=user_email
        # doc.insert()
        doc.save()
        doc.submit()
        return {'status':200,'message':'Signature saved successfully'}
    except Exception as e:
        return {'status':500,'message':str(e)}
# ++++ Save Signature End ++++++++++++

# ++++ Get Signature ++++++++++++
@frappe.whitelist(allow_guest=True)
def get_signatures(user_mail):
    try:
        signatures = frappe.get_all(
            'Esign_signature',
            filters={'user_mail': user_mail},
            fields=['name', 'sign_blob', 'sign_name', 'user_mail', 'user_name', 'creation']
        )
        return {'status': 200, 'data': signatures}
    except Exception as e:
        return {'status': 500, 'message': str(e)}
# ++++ Get Signature End ++++++++++++

# ++++ Delete Sign ++++++++++++++++++
@frappe.whitelist()
def cancel_and_delete_esignature(user_mail, name):
    try:
        # Fetch the Esign_signature document
        esignature = frappe.get_doc("Esign_signature", name)

        # Check if the fetched document belongs to the provided user_mail
        if esignature.user_mail == user_mail:
            # Cancel the document
            esignature.cancel()

            # Delete the document
            esignature.delete()

            return {"status": 200, "message": "Esign_signature canceled and deleted successfully."}
        else:
            return {"status": 403, "message": "User mail does not match. Access denied."}

    except frappe.DoesNotExistError:
        return {"status": 404, "message": "Esign_signature document not found."}
    except Exception as e:
        return {"status": 500, "message": f"Error: {str(e)}"}


# Templete API's_______________________________________________________________________________________________________________________________________________
# ++++ Save Templete ++++++++++++
@frappe.whitelist(allow_guest= True)
def save_templete(templete_name, user_full_name, user_email):
    try:
        doc=frappe.get_doc({'doctype':'TempleteList'})
        doc.templete_title=templete_name
        doc.templete_owner_name=user_full_name
        doc.templete_owner_email=user_email
        doc.templete_created_at=datetime.now()
        doc.save()
        return {'status':200,'message':'Templete Created successfully'}
    except Exception as e:
        return {'status':500,'message':str(e)}
# ++++ Save Templete End ++++++++++++
# ++++ Get Templete ++++++++++++
@frappe.whitelist(allow_guest=True)
def get_templetes(user_mail):
    try:
        templetes_list = frappe.get_all(
            'TempleteList',
            filters={'templete_owner_email': user_mail},
            fields=['name','templete_title', 'templete_owner_email', 'templete_owner_name', 'templete_created_at']
        )
        return {'status': 200, 'data': templetes_list}
    except Exception as e:
        return {'status': 500, 'message': str(e)}
# ++++ Get Templete End ++++++++++++

#+++++ Delete Templete +++++++++++++++++
@frappe.whitelist()
def delete_esign_templete(user_mail, name):
    try:
        # Fetch the Esign_signature document
        templeteList = frappe.get_doc("TempleteList", name)

        # Check if the fetched document belongs to the provided user_mail
        if templeteList.templete_owner_email == user_mail:
            # Delete the document
            templeteList.delete()

            return {"status": 200, "message": "Templete deleted successfully."}
        else:
            return {"status": 403, "message": "User mail does not match. Access denied."}

    except frappe.DoesNotExistError:
        return {"status": 404, "message": "Templete document not found."}
    except Exception as e:
        return {"status": 500, "message": f"Error: {str(e)}"}

# Templete APIs --------------------------------------------------------------------
# ++++ Update Template ++++++++++++
@frappe.whitelist(allow_guest=True)
def update_template(templete_name,templete_json_data, base_pdf_data):
    try:
        # Parse JSON data
        templete_json_data = json.loads(templete_json_data)
        base_pdf_data = json.loads(base_pdf_data)

        doc = frappe.get_doc("TempleteList", templete_name)
        doc.templete_json_data = templete_json_data
        doc.base_pdf_data = base_pdf_data
        message = 'Template Updated successfully'
        doc.save()
        return {'status': 200, 'message': message}
    
    except Exception as e:
        return {'status': 500, 'message': str(e)}
# ++++ Save/Update Template End ++++++++++++


# Get JSON templete Data --- components +++++++++++++
@frappe.whitelist(allow_guest=True)
def get_template_json(templete_name):
    try:

        doc = frappe.get_doc("TempleteList", templete_name)
        response = {
            'status': 200,
            'templete_json_data': doc.templete_json_data,
            'base_pdf_data': doc.base_pdf_data
        }
        return response

    except frappe.DoesNotExistError:
        return {'status': 404, 'message': 'Template not found'}
    except Exception as e:
        return {'status': 500, 'message': str(e)}
# END================================================