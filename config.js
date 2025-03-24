const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Toxxic-Boy",
    ownerNumber: process.env.OWNER_NUMBER || "2348165846414",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS08zRVUxc2k1REZhakpCY0N2b0ZNYUVUWlN1aVRPcVN6YitUQ0xuVXNWRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRys1L1kzODVETVZDbjlkOHB3anM1WDd1WWlXQjNyKzZDTEhJeXB2aUNHUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIySW0yUXUwbDh4ek5hUzdock1NZzNaVmRxclB1elFTL1B6WnRJcXJsaG5jPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrajFvYUNldXFVQUdXaU1jaExSZkFpWTdzR0hNNVd2OXRVWFB0dlFiTTNZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtCRXArNXhVYkhFdjk0M2JiRWkyYTNpbzBkaFIrUkhRbzJHcTA3S2xRMGM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZOMmpXS1JENW1xeDFremVpczVtS2g4bHA3R0cyM29jQmlsU1EyeHNrUTA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUN0OURuanJjWFhodU1oSlc0Q3lEcHhwWEFpMWdKZk9lWFpudkczdDMydz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicGcrM3hvaWhjdnlxKzhlTEdtMkE0S1pEeG5Xc3VuS0wzeGZpUklybGJBST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjF5dzdUVVdRM1d0eUdMSTFTQzhWZ0JiNWtIckw4NWZnbXRtQzBFMjVDSE03MEp2amxDVjJ0Q3pvTHNZNHM5b1lJWkx3SVVteU9EZVZYMTlibzUvd2pBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI4LCJhZHZTZWNyZXRLZXkiOiJaNzJUaEd6MTd0YkxsUTF5bzliRlNpcytsYWpCNkxZcDlpa25RbjdwU0J3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJLTTJUQjJDUyIsIm1lIjp7ImlkIjoiOTE4NzMxOTAxNTIyOjI0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6In5pY2hpZ28iLCJsaWQiOiIxOTAxMzkwNDE2NjkzMToyNEBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0s3K3hjZ0ZFSU85aEw4R0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjlXdDdDYVE4SlBVSWRINFVLaXBNWXpWRThDNWJoTGtJRjYvUDFzcWJCRjQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6Inlxc2ZjNEduajFEM0tQMUluQ0wrTkplNlJmQk5MVSt4OVBvRU5WQUFLbHpSWDNiZ1ZoZU9ibGh0WGtLVDUrZmlLRzhCeENHbnkya3AvQ2ZEMG1qS0J3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJNR1NQL2dUSUExOThHbVNiSTBMdHMyRUV2SHVLbjUwanh4K09Eb2hnY0dTTmZiU2Y5RWRabDF1OW5XRVNDeVJHTmlDSnlJbXhnWWhraGxyNG9rN3BpQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkxODczMTkwMTUyMjoyNEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJmVnJld21rUENUMUNIUitGQ29xVEdNMVJQQXVXNFM1Q0Jldno5Ykttd1JlIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQWdJRWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDI4MDY2NzMsImxhc3RQcm9wSGFzaCI6IjJNRktQUSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRjdRIn0=",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
