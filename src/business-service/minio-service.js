let Minio = require('minio')
let stream = require('stream')
//连接minio文件服务器
var minioClient = new Minio.Client({
  endPoint: '', // 对象存储服务的URL
  port: 9001, // 端口号
  useSSL: false, // true代表使用HTTPS
  accessKey: '', // 账户id
  secretKey: '', // 密码
  partSize: '20M'
});