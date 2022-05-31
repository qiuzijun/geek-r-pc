let string =
  '[极客园]验证码<a onclick="copyValue(this)" href="javascript:void(0)">874360</a>,用于手机 <b>13811111111</b> 登录, 5分钟内有效。验证码提供给他人可能导致账号被盗,请勿泄露，谨防被骗';
const data = string.split(">");
const arr = data.map((item) => {
  return item.split("<");
});
console.log(arr[1][0], arr[3][0]);
