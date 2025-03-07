# AI-Email-Reply Extension
link for download link
https://drive.google.com/drive/folders/1ayivPExIMJaVofcbq2ZKhYT2vISaAagW?usp=drive_link


steps to load extension

1.Open Chrome and go to chrome://extensions/.

2.Enable Developer mode (top-right toggle).

3.Click "Load unpacked" and select your extension folder.

4.The extension will load and appear in the toolbar if it has an icon.





# **1. Get the API Key**

Step 1: Sign in to Google Cloud
Go to Google Cloud Console.
Sign in with your Google account.

Step 2: Create a New Project
Click on the "Select a project" button (top-left).
Click "New Project", give it a name, and create it.

Step 3: Enable the Gemini API
Navigate to the Gemini API Page.
Click "Enable" to activate the API for your project.

Step 4: Generate API Key
Go to "APIs & Services" > "Credentials" (on the left menu).
Click "Create Credentials" > "API Key".
Copy the generated API key and save it.

# add properties
3. Add to Spring Boot Properties
   gemini.api.url=https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent
   gemini.api.key=YOUR_GENERATED_API_KEY
