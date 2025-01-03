import json 
import base64
import frappe
import io
import subprocess

from frappe.core.doctype.communication.email import make
from frappe.utils import get_datetime, get_url

from datetime import datetime , timedelta
from OpenSSL import crypto
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization

from PyPDF2 import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter


from datetime import datetime

# ++++ PDF Doc Creation and signing +++++++++++++++
@frappe.whitelist(allow_guest=True)  # Expose as a Frappe API
def generate_signed_pdf(components, pages, private_key_pem, certificate_pem):
    """
    Generate and sign a PDF using components, pages, and certificates.
    """
    print("inside generate_signed_pdf ")
    try:
        def base64_to_pdf(base64_str):
            """Convert base64 string to binary PDF data."""
            print("\n\n\n-------------> base64ToPDF : " + base64.b64encode(base64_str))
            return base64.b64decode(base64_str)

        def add_components_to_page(pdf_writer, page, components):
            """Add components to a given page."""
            packet = io.BytesIO()
            can = canvas.Canvas(packet, pagesize=letter)
            print("\n\n\n-------------> inside add components to page")
            for component in components:
                pos = component["position"]
                top = pos["top"]
                left = pos["left"]

                if component["type"] == "text":
                    can.setFont("Helvetica", component.get("fontSize", 12))
                    can.drawString(left, letter[1] - top, component["content"])

            can.save()
            packet.seek(0)

            # Overlay the canvas onto the page
            overlay_pdf = PdfReader(packet)
            overlay_page = overlay_pdf.pages[0]
            page.merge_page(overlay_page)
            print("\n\n\n-------------> Completed add component to page ")
            pdf_writer.add_page(page)

        def merge_pdfs_with_components(pages, components):
            """Merge PDFs with components."""
            pdf_writer = PdfWriter()
            component_map = {int(comp["pageNo"]): [] for comp in components}
            print("\n\n\n-------------> components " , component_map)
            # print("\n\n\n-------------> page_data " , page_data)
            for comp in components:
                component_map[int(comp["pageNo"])].append(comp)

            for page_data in pages:
                pdf_bytes = base64_to_pdf(page_data["data"])
                reader = PdfReader(io.BytesIO(pdf_bytes))
                for page_no, page in enumerate(reader.pages, start=1):
                    comps = component_map.get(page_no, [])
                    add_components_to_page(pdf_writer, page, comps)

            output_pdf = io.BytesIO()
            print("\n\n\n-------------> Output Data : " , output_pdf)
            pdf_writer.write(output_pdf)
            return output_pdf.getvalue()

        def sign_pdf(pdf_data, private_key_pem, certificate_pem):
            """Digitally sign a PDF."""
            timestamp = datetime.now().isoformat()
            signed_pdf = io.BytesIO()

            print("______________> Signed PDF in sign pdf function", signed_pdf)
            # Load private key and certificate
            private_key = crypto.load_privatekey(crypto.FILETYPE_PEM, private_key_pem)
            certificate = crypto.load_certificate(crypto.FILETYPE_PEM, certificate_pem)

            print('\n\n\n+++++++++++++++++++++ Private Key :', private_key)
            print('\n\n\n+++++++++++++++++++++ Certificate :', certificate)

            # Sign the PDF
            writer = PdfWriter()
            reader = PdfReader(io.BytesIO(pdf_data))

            for page in reader.pages:
                writer.add_page(page)

            writer.add_metadata({
                "Author": "Frappe Service",
                "Title": "Digitally Signed PDF",
                "Subject": "Signed Document",
                "Producer": "PDF Generator",
                "CreationDate": timestamp
            })

            # Add signature field
            writer.write(signed_pdf)
            return signed_pdf.getvalue()

        # Parse input
        components = frappe.parse_json(components)
        pages = frappe.parse_json(pages)
        print("\n\n\n-------------> pages main function " , pages)
        print("\n\n\n-------------> components main function" , components)
        # Merge the PDFs with components
        merged_pdf = merge_pdfs_with_components(pages, components)

        # Digitally sign the merged PDF
        signed_pdf = sign_pdf(merged_pdf, private_key_pem, certificate_pem)
        print('\n\n\n================================ signed pdf', sign_pdf)
        # Return signed PDF as base64
        signed_pdf_base64 = base64.b64encode(signed_pdf).decode()
        print('\n\n\n================================ signed pdf 64 base :', signed_pdf_base64)
        return {"signed_pdf": signed_pdf_base64}

    except Exception as e:
        print('\n\n\n================================ error', e)
        frappe.log_error(f"Error in generate_signed_pdf: {str(e)}")
        return {"error": str(e)}


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


# ++++ Fetch OpenSSL List ++++++++++++
@frappe.whitelist(allow_guest=True)
def get_openssl_list(user_mail):
    try:
        openssl_list = frappe.get_all(
            'openssl',
            filters={'owner_email': user_mail},
            fields=['name','openssl_name','country','openssl_name']
        )
        return {'status': 200, 'data': openssl_list}
    except Exception as e:
        return {'status': 500, 'message': str(e)}


# Signature API's_______________________________________________________________________________________________________________________________________________
# ++++ Save Signature and SSL ++++++++++++

def run_command(command):
    """Execute a shell command and capture the output."""
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error running command: {command}")
        print(result.stderr)
        return None
    return result.stdout.strip()

def generate_private_key():
    """Generate a private key"""
    command = "openssl genpkey -algorithm RSA -out key.pem -pkeyopt rsa_keygen_bits:2048"
    run_command(command)
    with open("key.pem", "r") as f:
        private_key = f.read()
    return private_key

def generate_openssl_conf(C, ST, L, O, CN):
    """Generate openssl.conf content."""
    openssl_conf = f"""
[ req ]
default_bits        = 2048
distinguished_name  = req_distinguished_name
x509_extensions     = v3_req
prompt              = no

[ req_distinguished_name ]
C  = {C}
ST = {ST}
L  = {L}
O  = {O}
CN = {CN}

[ v3_req ]
keyUsage = critical, digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth, clientAuth, emailProtection, codeSigning
"""
    return openssl_conf

def generate_self_signed_cert():
    """Generate a self-signed certificate"""
    command = "openssl req -x509 -new -key key.pem -out cert.pem -days 365 -config openssl.conf"
    run_command(command)
    with open("cert.pem", "r") as f:
        cert = f.read()
    return cert

def generate_ca_key():
    """Generate CA private key"""
    command = "openssl genpkey -algorithm RSA -out ca_key.pem -pkeyopt rsa_keygen_bits:2048"
    run_command(command)
    with open("ca_key.pem", "r") as f:
        ca_private_key = f.read()
    return ca_private_key

def generate_ca_cert(C, ST, L, O, CN, email):
    """Generate CA certificate"""
    command = f"openssl req -x509 -new -nodes -key ca_key.pem -sha256 -days 1024 -out ca_cert.pem -subj '/C={C}/ST={ST}/L={L}/O={O}/CN={CN}/emailAddress={email}'"
    run_command(command)
    with open("ca_cert.pem", "r") as f:
        ca_cert = f.read()
    return ca_cert

def generate_csr(C, ST, L, O, CN, email):
    """Generate CSR"""
    command = f"openssl req -new -key key.pem -out csr.pem -subj '/C={C}/ST={ST}/L={L}/O={O}/CN={CN}/emailAddress={email}'"
    run_command(command)
    with open("csr.pem", "r") as f:
        csr = f.read()
    return csr

def sign_csr_with_ca():
    """Sign CSR with the CA"""
    command = "openssl x509 -req -in csr.pem -CA ca_cert.pem -CAkey ca_key.pem -CAcreateserial -out cert.pem -days 365 -sha256"
    run_command(command)
    with open("cert.pem", "r") as f:
        signed_cert = f.read()
    return signed_cert

# Save Keys
def save_temp_files_to_variables():
    """Save the content of temporary files to variables."""
    temp_files = ["key.pem", "ca_key.pem", "ca_cert.pem", "cert.pem", "csr.pem", "openssl.conf"]
    
    # Dictionary to hold file contents
    file_contents = {}
    
    for file in temp_files:
        try:
            with open(file, "r") as f:
                file_contents[file] = f.read()  # Read file content and save it in the dictionary
        except FileNotFoundError:
            file_contents[file] = None  # If the file doesn't exist, set its value to None
    
    # Create separate variables for each file content
    key_pem = file_contents["key.pem"]
    ca_key_pem = file_contents["ca_key.pem"]
    ca_cert_pem = file_contents["ca_cert.pem"]
    cert_pem = file_contents["cert.pem"]
    csr_pem = file_contents["csr.pem"]
    openssl_conf = file_contents["openssl.conf"]
    
    # Return the variables as a dictionary for easy access
    return {
        "key_pem": key_pem,
        "ca_key_pem": ca_key_pem,
        "ca_cert_pem": ca_cert_pem,
        "cert_pem": cert_pem,
        "csr_pem": csr_pem,
        "openssl_conf": openssl_conf,
    }

def cleanup_temp_files():
    """Remove temporary files used for signing."""
    temp_files = ["key.pem", "ca_key.pem", "ca_cert.pem", "cert.pem", "csr.pem", "openssl.conf"]
    
    file_data = save_temp_files_to_variables()
    for var_name, content in file_data.items():
        print(f"Content of {var_name}:")
        print(content)

    for file in temp_files:
        command = f"rm -f {file}"  # -f ensures no error is raised if the file doesn't exist
        run_command(command)

@frappe.whitelist(allow_guest=True)
def genrate_and_store_keys(country,state,location,organization,challenge_password,countryCode,username,email,openssl_name):
    try:
        C = countryCode
        ST = state
        L = location
        O = organization
        CN = username
        eml = email
        # challenge_password = "Pass123" 
        generate_private_key()
        # Step 2: Generate openssl.conf data
        openssl_conf_content = generate_openssl_conf(C, ST, L, O, CN)
        print("Generated openssl.conf content:\n", openssl_conf_content)
        # Save the openssl.conf content to a file
        with open("openssl.conf", "w") as f:
            f.write(openssl_conf_content)
        # Step 3: Generate the self-signed certificate
        generate_self_signed_cert()
        # Step 4: Generate CA private key
        generate_ca_key()
        # Step 5: Generate CA certificate
        generate_ca_cert(C, ST, L, O, CN, eml)
        # Step 6: Generate CSR
        generate_csr(C, ST, L, O, CN, eml)
        # Step 7: Sign the CSR with the CA
        sign_csr_with_ca()
        # Step 8: Regenerate self-signed cert (if needed)
        generate_self_signed_cert()
        # cleanup_temp_files()
        file_data = save_temp_files_to_variables()
        for var_name, content in file_data.items():
            print(f"Content of {var_name}:")
            print(content)
        
        print('\n+++++++++++++++++++++++++++++++++++++####')
        # print('data ::::', file_data)
        print('key_pem:', file_data["key_pem"])
        print('ca_cert_pem:', file_data["ca_cert_pem"])
        print('csr_pem:', file_data["csr_pem"])
        print('owner_email:', email)
        print('ca_key_pem:', file_data["ca_key_pem"])
        print('cert_pem:', file_data["cert_pem"])
        print('openssl_conf:', file_data["openssl_conf"])
        print('+++++++++++++++++++++++++++++++++++++\n')
        
        doc1 = frappe.get_doc({
            'doctype': 'openssl_keys',
            'openssl_name': openssl_name,
            'username': username,
            'key_pem': file_data["key_pem"],  
            'ca_cert_pem': file_data["ca_cert_pem"],
            'csr_pem': file_data["csr_pem"],
            'owner_email': email,
            'ca_key_pem': file_data["ca_key_pem"],
            'cert_pem': file_data["cert_pem"],
            'openssl_conf': file_data["openssl_conf"],
            })
        # doc1 = frappe.get_doc({
        #     'doctype': 'openssl_keys',
        #     'openssl_name': openssl_name,
        #     'username': username,
        #     'key_pem': 'NA',  
        #     'ca_cert_pem':'NA',
        #     'csr_pem': 'NA',
        #     'owner_email': 'NA',
        #     'ca_key_pem': 'NA',
        #     'cert_pem': 'NA',
        #     'openssl_conf': 'NA',
        #     })

        doc1.save()
        # doc1.submit()

        doc = frappe.get_doc({
            'doctype': 'openssl',
            'country': country,
            'country_code': countryCode,
            'state': state,
            'challenge_password': challenge_password,
            'city': location,
            'organization': organization,
            'username': username,
            'openssl_keys': '',
            'owner_email': email,
            'openssl_name': openssl_name
        })
        doc.save()

      

        return {'status': 200, 'message': 'SSL saved successfully'}
    except Exception as e:
        print("Exception:", e)
        return {'status': 500, 'message': str(e) }

def generate_rsa_key_pair():
    """
    Generates an RSA private and public key pair.
    """
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048
    )

    private_key_pem = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()
    )

    public_key = private_key.public_key()
    public_key_pem = public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    )

    return private_key_pem.decode('utf-8'), public_key_pem.decode('utf-8')

def generate_self_signed_certificate(private_key_pem, public_key_pem, full_name, company_name, country_code, state):
    """
    Generates a self-signed certificate using the provided private key and public key.
    Signs the certificate using SHA-256.
    """
    # Load the private and public keys
    private_key = crypto.load_privatekey(crypto.FILETYPE_PEM, private_key_pem.encode('utf-8'))
    public_key = crypto.load_publickey(crypto.FILETYPE_PEM, public_key_pem.encode('utf-8'))
    current_time = datetime.utcnow().strftime('%Y%m%d%H%M%SZ')
    print("_________________--------------------------------> Current time : " , current_time)
    one_year_later = (datetime.utcnow() + timedelta(days=365)).strftime('%Y%m%d%H%M%SZ')
    # Create a self-signed certificate
    cert = crypto.X509()
    cert.set_version(2)
    cert.set_serial_number(1000)
    cert.get_subject().CN = full_name
    cert.get_subject().O = company_name
    cert.get_subject().C = country_code
    cert.get_subject().ST = state
    cert.set_issuer(cert.get_subject())  # Self-signed, so issuer is the subject
    cert.set_notBefore(current_time.encode())  # Set to the current UTC date-time
    cert.set_notAfter(one_year_later.encode())   # One-year validity

    cert.set_pubkey(public_key)

    # Use SHA-256 to sign the certificate
    cert.sign(private_key, 'sha256')

    # Export the certificate in PEM format
    cert_pem = crypto.dump_certificate(crypto.FILETYPE_PEM, cert).decode('utf-8')

    return cert_pem
@frappe.whitelist(allow_guest=True)
def save_signature(
    signature_data, signature_name, user_full_name, user_email, 
    
):
    try:
        # Generate RSA Key pair
        # Log document fields to ensure correct values
        # print(f"Saving document with user_mail: {user_email}, certificate size: {len(cert_base64)} bytes")

        doc = frappe.get_doc({
            'doctype': 'Esign_signature',
            'sign_blob': signature_data,
            'sign_name': signature_name,
            'user_name': user_full_name,
            'user_mail': user_email,

        })

        # Ensure no null values or unexpected types are present
        # print("Before saving the document: ", doc.as_dict())

        doc.save()
        doc.submit()

        return {'status': 200, 'message': 'Signature saved successfully'}
    except Exception as e:
        print("Exception:", e)
        return {'status': 500, 'message': str(e)}


# ++++ Get Signature ++++++++++++
@frappe.whitelist(allow_guest=True)
def get_signatures(user_mail):
    try:
        signatures = frappe.get_all(
            'Esign_signature',
            filters={'user_mail': user_mail},
            fields=['name', 'sign_blob', 'sign_name', 'user_mail', 'user_name', 'creation', 'certificate','cert_pem']
        )
        return {'status': 200, 'data': signatures}
    except Exception as e:
        return {'status': 500, 'message': str(e)}
# ++++ Get Signature End ++++++++++++

# ++++ Delete Sign ++++++++++++++++++
@frappe.whitelist()
def cancel_and_delete_esignature(user_mail, name):
    try:
        esignature = frappe.get_doc("Esign_signature", name)

        if esignature.user_mail == user_mail:
            esignature.cancel()

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
@frappe.whitelist(allow_guest=True)
def save_templete(templete_name, user_full_name, user_email):
    try:
        from datetime import datetime
        # Create a new document
        doc = frappe.get_doc({'doctype': 'TempleteList'})
        doc.templete_title = templete_name
        doc.templete_owner_name = user_full_name
        doc.templete_owner_email = user_email
        doc.templete_created_at = datetime.now()
        doc.save()
        
        # Fetch the saved template based on email
        templetes_list = frappe.get_all(
            'TempleteList',
            filters={'templete_owner_email': user_email , 'templete_title': templete_name },
            fields=['name', 'templete_title', 'templete_owner_email', 'templete_owner_name', 'templete_created_at']
        )
        
        # Return success response with data
        return {'status': 200, 'message': 'Templete Created successfully', 'data': templetes_list}
    except Exception as e:
        # Return error response with exception message
        return {'status': 500, 'message': str(e)}

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
        templeteList = frappe.get_doc("TempleteList", name)
        if templeteList.templete_owner_email == user_mail:
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

# ================================= Document API =================================
# Fetch Template data 
@frappe.whitelist(allow_guest=True)
def get_templetes_list_doc(user_mail):
    try:
        templetes_list = frappe.get_all(
            'TempleteList',
            filters={'templete_owner_email': user_mail},
            fields=['name']
        )
        return {'status': 200, 'data': templetes_list}
    except Exception as e:
        return {'status': 500, 'message': str(e)}
#END================================================
# Save Document data
@frappe.whitelist(allow_guest=True)
def save_template_document(templete_name, document_name, user_email):
    try:
        template_data = get_template_data(templete_name)
        document_data = {
            'doctype': 'DocumentList', 
            'document_title': document_name,
            'template_title': templete_name,
            'owner_email': user_email,
            'document_json_data': template_data['templete_json_data'],
            'base_pdf_datad': template_data['base_pdf_data'],
            'document_created_at': datetime.now()
        }
        document_doc = frappe.get_doc(document_data)
        document_doc.insert()

        return {'status': 200, 'message': 'Template and Document created successfully'}
    except Exception as e:
        return {'status': 500, 'message': str(e)}
        
def get_template_data(templete_name):
    try:
        template_doc = frappe.get_doc('TempleteList', {'name': templete_name})
        return {
            'templete_json_data': template_doc.templete_json_data, 
            'base_pdf_data': template_doc.base_pdf_data
        }
    except frappe.DoesNotExistError:
        return {
            'templete_json_data': '',
            'base_pdf_data': ''
        }

#Document List Display ++++++++++++++++++++++++++++++++++++++++++++
# Get Documents 
@frappe.whitelist(allow_guest=True)
def get_documents_list(user_mail):
    try:
        document_list = frappe.get_all(
            'DocumentList',
            filters={'owner_email': user_mail , 'isnoteditable': 0},
            fields=['name','document_title', 'template_title', 'owner_email', 'document_created_at', 'isnoteditable']
        )
        return {'status': 200, 'data': document_list}
    except Exception as e:
        return {'status': 500, 'message': str(e)}

#+++++ Delete Templete +++++++++++++++++
@frappe.whitelist()
def delete_esign_document(user_mail, name):
    try:
        documentList = frappe.get_doc("DocumentList", name)
        if documentList.owner_email == user_mail:
            documentList.delete()
            return {"status": 200, "message": "Document deleted successfully."}
        else:
            return {"status": 403, "message": "User mail does not match. Access denied."}

    except frappe.DoesNotExistError:
        return {"status": 404, "message": "Document not found."}
    except Exception as e:
        return {"status": 500, "message": f"Error: {str(e)}"}

# ++++++ Get Document Components and BasePDF data +++++++++++++++
@frappe.whitelist(allow_guest=True)
def get_document_components_and_basepdf(document_name):
    try:
        doc = frappe.get_doc("DocumentList", document_name)
        response = {
            'status': 200,
            'document_json_data': doc.document_json_data,
            'base_pdf_datad': doc.base_pdf_datad,
            'assigned_users': doc.assigned_users,
            'iscompleted': doc.iscompleted,
        }
        return response

    except frappe.DoesNotExistError:
        return {'status': 404, 'message': 'Document not found'}
    except Exception as e:
        return {'status': 500, 'message': str(e)}

# update document State 
@frappe.whitelist(allow_guest=True)
def update_document(document_title,document_json_data, base_pdf_datad , assigned_user_list):
    try:
        # Parse JSON data
        document_json_data = json.loads(document_json_data)
        base_pdf_datad = json.loads(base_pdf_datad)
        assign_users = json.loads(assigned_user_list)
        
        doc = frappe.get_doc("DocumentList", document_title)

        doc.document_json_data = document_json_data
        doc.base_pdf_datad = base_pdf_datad
        doc.assigned_users = assign_users
        message = 'Document Updated successfully'
        doc.save()
        return {'status': 200, 'message': message}
    
    except Exception as e:
        return {'status': 500, 'message': str(e)}
# ++++ Save/Update Template End ++++++++++++

@frappe.whitelist(allow_guest=True)
def patch_user_status_document(document_title, assigned_user_list):
   
    try:
        assign_users = json.loads(assigned_user_list)
        doc = frappe.get_doc("DocumentList", document_title)
        doc.assigned_users = assign_users
        doc.save()
        message = 'Assigned users updated successfully'
        return {'status': 200, 'message': message}
    except Exception as e:
        return {'status': 500, 'message': str(e)}


# update document and assign to users [ Frezzee the document ]

@frappe.whitelist(allow_guest=True)
def send_document_data(to, subject, body, document_name, user_mail, isChecked):
    try:
        doc = frappe.get_doc("DocumentList", document_name)
        
        doc.assigned_users = to
        doc.document_subject = subject
        doc.description = body
        doc.user_mail = user_mail
        doc.isnoteditable = isChecked
        
        doc.save()
        send_url_email(to, subject ,body)

        return {'status': 200, 'message': 'Document Assigned Successfully'}
    
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "send_document_data")
        return {'status': 500, 'message': str(e)}
# End ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

def send_url_email(to, subject , message):
    to_users=json.loads(to)
    try: 
        full_url = f"http://192.168.10.189:8080/"
        emb_message = f"Dear User,<br><br>You Have been assigned to sign A Document by: <a href='{full_url}'>{full_url}</a><br><br>Thank you. <div>Discription: {message}</div>"
        emails = [entry["email"] for entry in to_users.values()]
        print(emails)
        frappe.sendmail(
            recipients=emails,
            subject=subject,
            message=emb_message
        )
    except Exception as e:
        print('Error-----------> URL',e)

# def test_send_url_email(to=["sbhosale@dexciss.com"], subject='GGGG', message='OP'):
#     try:
#         frappe.sendmail(
#             recipients=to,
#             subject=subject,
#             message=message
#         )
#         print('Email sent successfully')
#     except Exception as e:
#         print('Error-----------> URL', e)



# get List for User of Doc Assigned Fetch +++++++++++++++++++++++++++++++++++++++++++++++++++++++++  
@frappe.whitelist(allow_guest=True)
def get_documents_by_user(user_mail):
    try:
        documents_list = frappe.get_all(
            'DocumentList',
            filters={'isnoteditable': 1, 'assigned_users': ['like', f'%{user_mail}%']},
            fields=['name', 'document_title', 'owner_email', 'document_created_at', 'assigned_users']
        )
        return {'status': 200, 'data': documents_list}
    except Exception as e:
        return {'status': 500, 'message': str(e)}

# get List for Sent Data Box +++++++++++++++++++++++++++++++++++++++++++++++++++++++++  
@frappe.whitelist(allow_guest=True)
def sent_doc_by_user(user_mail):
    try:
        documents_list = frappe.get_all(
            'DocumentList',
            filters={'isnoteditable': 1, 'owner_email': user_mail},
            fields=['document_subject','name', 'document_title', 'owner_email', 'document_created_at', 'assigned_users', 'description' ]
        )
        return {'status': 200, 'data': documents_list}
    except Exception as e:
        return {'status': 500, 'message': str(e)}

# ___________________________________________________________Doc Status User Assign Update _______________________________________________________________________________________
@frappe.whitelist(allow_guest=True)
def get_assigned_users_list_check(user_document_name):
    try:
        document = frappe.get_doc('DocumentList', user_document_name)
        doc_data = {
            'assigned_users': document.assigned_users,
            'iscompleted': document.iscompleted
        }
        
        return {'status': 200, 'data': doc_data}
    except Exception as e:
        return {'status': 500, 'message': str(e)}


@frappe.whitelist(allow_guest=True)
def update_document_status_confirm(user_document_name):
    try:
        document = frappe.get_doc('DocumentList', user_document_name)
        document.iscompleted = True
        document.save()
        
        return {'status': 200, 'message': 'Document status updated successfully.'}
    except Exception as e:
        return {'status': 500, 'message': str(e)}


# Finl Doc Confirmation 
@frappe.whitelist(allow_guest=True)
def submit_final_document(document_title,document_json_data):
    try:
        # Parse JSON data
        document_json_data1 = json.loads(document_json_data)
        print("Document data __________________",document_json_data1)
        doc = frappe.get_doc("DocumentList", document_title)
        doc.document_json_data = document_json_data
     
        message = 'Document completed successfully'
        doc.save()
        return {'status': 200, 'message': message}
    
    except Exception as e:
        return {'status': 500, 'message': str(e)}
# ++++ Save/Update Template End ++++++++++++