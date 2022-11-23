const crypto = require("crypto");

const env = {
  secret: "0",
  algType:"sha3-512",
  digest: "hex",
  maxLength: 256,
}

function generateHash(data){
  return crypto.createHash(env.algType).update(data).digest(env.digest);
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = env.secret;
  const MAX_PARTITION_KEY_LENGTH = env.maxLength;

  let candidate;

  if(!event) return TRIVIAL_PARTITION_KEY;

  if(event && !event.partitionKey){
    candidate = JSON.stringify(event);
  } else {
    candidate = typeof event.partitionKey !== "string" ? JSON.stringify(event.partitionKey) : event.partitionKey;
    if(candidate.length <= MAX_PARTITION_KEY_LENGTH) return candidate;
  }

  return generateHash(candidate);
};