import frappe

@frappe.whitelist(allow_guest= True)
def create_user(fullName,password,email):
    # print('hdfiewjh')
    try:
        # print("fullName, password, email, roles:")
        doc=frappe.get_doc({'doctype':'User'})

        doc.email=email
        doc.first_name=fullName
        doc.full_name=fullName
        doc.username=fullName
        doc.new_password=password
        doc.role_profile_name="esign"
        # doc.append('role_profiles', {'role_profile_name': 'esign'})

        doc.send_welcome_email=0
        # doc.roles="esign"
        # doc.append('roles', {'role': 'esign'})
        # for role in roles:
        #     doc.append('role_profiles', {'role': role}) 
        doc.insert()
        print("try"*40)
        return {'status':200,'message':'User created successfully'}
    except Exception as e:
        print("exception"*30)
        return {'status':500,'message':str(e)}