const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "AJ",
    ownerNumber: process.env.OWNER_NUMBER || "2347051415404",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifPack: process.env.EXIF_PACK || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifAuthor: process.env.EXIF_AUTHOR || "𝑴𝒂𝒅𝒆 𝑩𝒚 𝑻𝒐𝒙𝒙𝒊𝒄",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "false" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "false" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "false" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0habGRZUVExT0NSbXVNNWZoNmVrUEsyY01Uem5ZazZTQytodXFPSCswND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMXh4dmJMMUVkVGVYYy9qbzY0b3c2ZFRmVjJraDcxdDVQNG1vb255cDVWND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtR2I4U1VGaHhhS2EvQzNYRGN1aDVCWUpXNGMrT01CbSs2aEJaN3dRbm04PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrcEJ6WUtqSS9aeXVCU09TMTVzVDZZQVVUZmc1NEdVN3BLeWR6dDREUm5JPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1JUUIvcWk1YmJaWFZQaUZxdWRyNHRDRTBLeldUWitLc3YrSVhXS3FHRlU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxObTEwYno2Y0U3M0xiMFV4K3RSajM3VlBGNllaS3ZZeG0yeDhOdHRsUms9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid01RYmZNTmw4L2ZhSW8zUVk4bXA4d253SldqalBqNElZbHZOcmpzakRtZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTG9lUzRsTlJWRTZVTWExWjdtK2ZBa0dadW15WmNpZFZZRzJjbWNJbG9Daz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhxYlZPalp1cXd0V1l0dmE3b0xZTnM1c1RXQit1NmV0TWdBRzYwNjRVLzBFeHRvMTZUMjc4MHdYS0lCa3lJLzA4TFE4VEdxRTlZdWdMR2NQSnJIV0F3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDEsImFkdlNlY3JldEtleSI6IjhYUjV5VzQvTitOSTNIR09jRi9SRlU0aFhJR0ttOWdvUjd2aUxHMktoS0k9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6Ijk2SDNWQUFOIiwibWUiOnsiaWQiOiIyMzQ3MDUxNDE1NDA0OjM5QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCdk5jwnZO88J2TqvCdk6rwnZOsIPCdk5DwnZOz8J2TqvCdlIIiLCJsaWQiOiI2OTE5Mzc2ODc1NTUyOjM5QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSWVXejljSEVKL0V3OEFHR0FZZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiT1NJVk0rU0YzNytnclN2Z0FDRFA2bHVEY0pjQS9DUUE1M0tlRzZlZ2UxMD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiNWdyWEJ2WkQ3am5QV2g0dy9jV3pLVUlYM25oWXY3Y2E3NllHb3B1YlRTaDFIUE9nWXg3cFUzcHJna0hlb08rT3hmb3l1NnFFUWlnSEpVZnNJOEp3QkE9PSIsImRldmljZVNpZ25hdHVyZSI6IkdyQlNEMU1EYVJvR29STWFLU1N1RG52L0JFUnMzOW1IU0oxS3htQllpSEc3LzZFcWFmL3A3YWIxZGNkVjlkOXRlamJ5R3RUSm1vU0Rwb3h0WTZZc0FBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0NzA1MTQxNTQwNDozOUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUa2lGVFBraGQrL29LMHI0QUFneitwYmczQ1hBUHdrQU9keW5odW5vSHRkIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQTBJRWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDU5MzY5NDIsImxhc3RQcm9wSGFzaCI6IjJQMVloZiJ9",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    sessionSite: process.env.SESSION_SITE || 'https://session-toxxictech.zone.id/', 
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`🔥 Update detected in '${__filename}', reloading Rias Gremory's config...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
