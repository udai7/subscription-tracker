import aj from '../config/arcjet.js';

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, {requested: 1});

        if (decision.isDenied()){
            if(decision.reason.isRateLimit()) return res.status(429).json({ message: 'Rate limit exceeded' });
            if(decision.reason.isBot()) return res.status(403).json({ message: 'Bot Detected' });

            return res.status(403).json({ message: 'Request Denied' });
        }
        next();
    } catch (error) {
        console.log(`Arcjet Middleware Error: ${error}`);
        next(error);
    }
}

export default arcjetMiddleware;