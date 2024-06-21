import frappe

@frappe.whitelist()
def create_user(fullName,password,email):
    try:
        #  print("fullName, password, email, roles:", fullName, password, email, roles)
        doc=frappe.get_doc({'doctype':'User'})

        doc.email=email
        doc.first_name=fullName
        doc.full_name=fullName
        doc.username=fullName
        doc.new_password=password
        # doc.role_profiles=["esign"]
        doc.append('role_profiles', {'role_profile': 'esign'})
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