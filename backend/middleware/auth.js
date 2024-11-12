import jwt from 'jsonwebtoken';
// import { OAuth2Client } from 'google-auth-library';

// const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;

const auth = async (req, res, next) => {
    try {
        console.log('header: ', req.headers);
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: 'Authentication failed!' });
        }

        const decodedData = jwt.decode(token);

        // if (decodedData && decodedData.iss && decodedData.iss === 'accounts.google.com') {
        //     const client = new OAuth2Client(CLIENT_ID);
        //     const ticket = await client.verifyIdToken({
        //         idToken: token,
        //         audience: CLIENT_ID,
        //     });
        //     req.userId = ticket.getPayload()?.sub; // Use the Google user ID
        
        // }
        const verifiedData = jwt.verify(token, 'test');
        req.userId = verifiedData?.id;

        next();
    } catch (error) {
        console.log('Authentication error:', error);
        res.status(401).json({ message: 'Authentication failed!' });
    }
};

export default auth;