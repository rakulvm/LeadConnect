import smtplib
from email.mime.text import MIMEText
import traceback
from .config import BaseConfig

def send_confirmation_link_to_user(recipient_email, recipient_first_name, recipient_last_name, verification_link):
  try:
    subject = f"IMPORTANT: Confirm your registraion with leadmanagement "
    body=f"""
    <html>
<body style="
display: flex;
align-items: center;
justify-content: center;">
<div class="container" style="background: #fff;
padding: 35px 65px;
border-radius: 12px;
text-align: -webkit-center;
row-gap: 20px;
box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);">
<header style=" height: 75px;text-align: -webkit-center;color: #fff;">
<img style=" height: 75px;"
src="https://bcstechnologies.com/wp-content/uploads/2022/12/1-1.png"/>
</header>
<h4>Hi {recipient_first_name} {recipient_last_name}, thank you for registering with leadmanagement . As the next step, kindly obtain your 4-digit PIN from the administrator. Once you have your PIN, please proceed to the following link and enter your PIN to confirm your registration.</h4>
<a href="{verification_link}" style="display: inline-block; text-decoration: none; color: #fff; background-color: #0e4bf1; margin-top: 20px; margin-bottom: 20px; width: 100%; padding: 12px 0; border-radius: 6px; font-size: 18px; text-align: center; cursor: pointer; transition: all 0.2s ease;">Verification Link</a>
<h5>If you're having trouble clicking that link, just copy and paste this URL into your browser's address bar: {verification_link}</h4>
</div>
</body>
</html>
    """
    html_message = MIMEText(body, 'html')
    html_message['Subject'] = subject
    html_message['From'] = BaseConfig.SENDER_EMAIL
    html_message['To'] = "saravananc2023@gmail.com"
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
      server.login(BaseConfig.SENDER_EMAIL, BaseConfig.SENDER_PASSWORD)
      server.sendmail(BaseConfig.SENDER_EMAIL, "saravananc2023@gmail.com", html_message.as_string())
  except Exception as e:
    print(traceback.format_exc())

def send_email_to_admin(recipient_email, recipient_first_name, recipient_last_name, pin):
  try:
    pin1= pin[0]
    pin2= pin[1]
    pin3= pin[2]
    pin4= pin[3]
    subject = f"IMPORTANT: PIN for {recipient_first_name} to access leadmanagement "
    body = f"""
    <html>
<body style="
display: flex;
align-items: center;
justify-content: center;">
<div class="container" style="background: #fff;
padding: 35px 65px;
border-radius: 12px;
text-align: -webkit-center;
row-gap: 20px;
box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);">
<header style=" height: 75px;text-align: -webkit-center;color: #fff;">
<img style=" height: 75px;"
src="https://bcstechnologies.com/wp-content/uploads/2022/12/1-1.png"/>
</header>
<h4>{recipient_first_name} {recipient_last_name} has successfully registered with leadmanagement . To grant access to the leadmanagement  website, {recipient_first_name} will need to confirm using the verification pin provided below. Please ensure to provide the pin within the next 24 hours.</h4>
<h4>You can contact {recipient_first_name} using this email address: {recipient_email}</h4>
<button style="background: #0e4bf1;margin-top: 20px;margin-bottom: 20px; width: 100%; color: #fff; font-size: 18px; border: none; padding: 12px 0; cursor: pointer; border-radius: 6px; pointer-events: none;  background: #6e93f7;transition: all 0.2s ease;" disabled>Verification PIN</button>
<div class="input-field" style="
flex-direction: row;text-align: -webkit-center
column-gap: 15px;" disabled>
<input type="number" style="height: 60px;
width: 55px;
border-radius: 6px;
outline: none;
font-size: 24px;padding-left: 15px;
text-align: center;
border: 1px solid #ddd;" disabled value="{pin1}"/>
<input type="number" style="height: 60px;
width: 55px;
border-radius: 6px;
outline: none;
font-size: 24px;padding-left: 15px;
text-align: center;
border: 1px solid #ddd;" disabled value="{pin2}"/>
<input type="number" style="height: 60px;
width: 55px;
border-radius: 6px;
outline: none;
font-size: 24px;padding-left: 15px;
text-align: center;
border: 1px solid #ddd;" disabled value="{pin3}"/>
<input type="number"  style="height: 60px;
width: 55px;
border-radius: 6px;
outline: none;
font-size: 24px;padding-left: 15px;
text-align: center;
border: 1px solid #ddd;" disabled value="{pin4}"/>
</div>

</div>
</body>
</html>

    """
    html_message = MIMEText(body, 'html')
    html_message['Subject'] = subject
    html_message['From'] = BaseConfig.SENDER_EMAIL
    html_message['To'] = BaseConfig.ADMIN_EMAIL
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
      server.login(BaseConfig.SENDER_EMAIL, BaseConfig.SENDER_PASSWORD)
      server.sendmail(BaseConfig.SENDER_EMAIL, BaseConfig.ADMIN_EMAIL, html_message.as_string())
  except Exception as e:
    print(traceback.format_exc())

