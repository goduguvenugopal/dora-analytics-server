const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

const corsOptions = {
  origin: (origin, callback) => {
    if (origin && allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("access restricted by cors error"));
    }
  },
};



module.exports = corsOptions