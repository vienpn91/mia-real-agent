export const handleEmailCensor = (email) => {
  const emailSplit = email.split('@');
  const tail = emailSplit[1].split('.');
  const host = tail[0];
  delete tail[0];
  return `${stringWithCensor(emailSplit[0])}@${stringWithCensor(host)}${tail.join('.')}`;
};

const stringWithCensor = (string) => {
  const cutIndex = Math.ceil(string.length * 0.7);
  return `${'*'.repeat(cutIndex)}${string.slice(cutIndex)}`;
};
