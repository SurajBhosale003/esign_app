import frappe
# ++++ Save or Create User ++++++++++++
@frappe.whitelist(allow_guest= True)
def create_user(fullName,password,email):
    try:
        doc=frappe.get_doc({'doctype':'User'})
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
