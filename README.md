# tamuhack2021
Front end is in the Kiosk folder. 
Use yarn install & yarn start to launch the Electron app

Backend server is in server.py
Run 

pip install -r requirements.txt

python server.py

to run backend server

Note: if you try to run the socket server, you might need a couple of tries to get the face detection working. Sometimes the server will emit a "face detected" message but the client isn't ready to receive it yet. We weren't able to find a solution for this. 

Also, for the gestures to work, you need a very specific lighting where the background has high contrast against the hand. We spent a lot of time finding such environment so unfortunately most of your attempts at getting a good gesture reading will be futile :(
