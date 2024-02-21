const { google } = require('googleapis');
const moment = require('moment')

require('dotenv').config();



const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKENT });

const getmail  = async (req, res) => {
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    try {
        const response = await gmail.users.messages.list({
            userId: 'me',
        });

        const messages = response.data.messages;

        if (messages.length) {
            const getEmailPromises = messages.map(async (message) => {
                const email = await gmail.users.messages.get({
                    userId: 'me',
                    id: message.id,
                });

                const { id, snippet, labelIds, payload } = email.data;
                const subject = payload.headers.find(header => header.name === 'Subject').value;
                const sender = payload.headers.find(header => header.name === 'From').value;
                const date = payload.headers.find(header => header.name === 'Date').value;
                let body = '';
    if (payload.parts) {
        body = payload.parts.reduce((acc, part) => {
            if (part.body && part.body.data) {
                acc += Buffer.from(part.body.data, 'base64').toString('utf-8');
            }
            return acc;
        }, '');
    } else if (payload.body && payload.body.data) {
        body = Buffer.from(payload.body.data, 'base64').toString('utf-8');
    }
                return {
                    id,
                    snippet,
                    labelIds,
                    subject,
                    sender,
                    date,
                    body
                };
            });
        
            const emails = await Promise.all(getEmailPromises);
            res.json(emails);
        }
         else {
            res.json({ message: 'No emails found.' });
        }
    } catch (error) {
        console.error('The API returned an error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getmailBysubject  = async (req, res) => {
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    const subject = req.params.subject
    try {
        const customQuery = `in:inbox subject:${subject}`;

        const response = await gmail.users.messages.list({
            userId: 'me',
            q:customQuery
        });

        const messages = response.data.messages;

        if (messages.length) {
            const getEmailPromises = messages.map(async (message) => {
                const email = await gmail.users.messages.get({
                    userId: 'me',
                    id: message.id,
                });

                const { id, snippet, labelIds, payload } = email.data;
                const subject = payload.headers.find(header => header.name === 'Subject').value;
                const sender = payload.headers.find(header => header.name === 'From').value;
                const date = payload.headers.find(header => header.name === 'Date').value;
                let body = '';
    if (payload.parts) {
        body = payload.parts.reduce((acc, part) => {
            if (part.body && part.body.data) {
                acc += Buffer.from(part.body.data, 'base64').toString('utf-8');
            }
            return acc;
        }, '');
    } else if (payload.body && payload.body.data) {
        body = Buffer.from(payload.body.data, 'base64').toString('utf-8');
    }
                return {
                    id,
                    snippet,
                    labelIds,
                    subject,
                    sender,
                    date,
                    body
                };
            });
        
            const emails = await Promise.all(getEmailPromises);
            res.json(emails);
        }
         else {
            res.json({ message: 'No emails found.' });
        }
    } catch (error) {
        console.error('The API returned an error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getmailByEmail  = async (req, res) => {
    
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    const email = req.params.email
    try {
        // const before = moment().toISOString()
        // const after = moment().subtract(5,"days").toISOString
        const customQuery = `in:inbox   from:${email}`;

        const response = await gmail.users.messages.list({
            userId: 'me',
            q:customQuery
        });

        const messages = response.data.messages;

        if (messages.length) {
            const getEmailPromises = messages.map(async (message) => {
                const email = await gmail.users.messages.get({
                    userId: 'me',
                    id: message.id,
                });

                const { id, snippet, labelIds, payload } = email.data;
                const subject = payload.headers.find(header => header.name === 'Subject').value;
                const sender = payload.headers.find(header => header.name === 'From').value;
                const date = payload.headers.find(header => header.name === 'Date').value;
                let body = '';
    if (payload.parts) {
        body = payload.parts.reduce((acc, part) => {
            if (part.body && part.body.data) {
                acc += Buffer.from(part.body.data, 'base64').toString('utf-8');
            }
            return acc;
        }, '');
    } else if (payload.body && payload.body.data) {
        body = Buffer.from(payload.body.data, 'base64').toString('utf-8');
    }
                return {
                    id,
                    snippet,
                    labelIds,
                    subject,
                    sender,
                    date,
                    body
                };
            });
        
            const emails = await Promise.all(getEmailPromises);
            res.json(emails);
        }
         else {
            res.json({ message: 'No emails found.' });
        }
    } catch (error) {
        console.error('The API returned an error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {getmail}






module.exports = {getmail,getmailBysubject,getmailByEmail}