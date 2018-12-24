export enum DIALOG {
  NO = 0,
  YES = 1,
  SUCCESS = 2,
  FAIL = 3,
  CANCEL = 4,
  OK = 5,
  CLOSE = 6
}

export enum API_RESULT {
  /// <summary>
  /// Thất bại
  /// </summary>
  Failed = 0,

  /// <summary>
  /// Thành công
  /// </summary>
  Success = 1,

  /// <summary>
  /// Lỗi input
  /// </summary>
  /// [Description("Dữ liệu không hợp lệ")]
  InvalidInput = 2,

  /// <summary>
  /// Không có data
  /// </summary>
  /// [Description("Không có dữ liệu")]
  NoData = 10,

  /// [Description("Cần xác nhận thông tin")]
  MustConfirmInfo = 11,

  /// <summary>
  /// Chuyển qua màn hình chat với bác sĩ
  /// </summary>
  GotoChatting = 20,

  /// <summary>
  /// Chuyển qua màn hình thanh toán
  /// </summary>
  GotoPayment = 21,

  /// <summary>
  /// Chuyển qua màn hình đặt lịch khám với loại là chat với bac sĩ
  /// </summary>
  GotoBookingAppointment = 22,

  /// <summary>
  /// Chưa đăng nhập
  /// </summary>
  NotLogin = 1000,

  /// <summary>
  /// Không có quyền
  /// </summary>
  Unauthorized = 1001,

  /// <summary>
  /// API không tồn tại
  /// </summary>
  UnexistedApi = 1002,

  /// <summary>
  /// Chữ ký không hợp lệ
  /// </summary>
  InvalidSign = 1003,

  /// <summary>
  /// Token hết hạn
  /// </summary>
  TokenExpire = 1004,

  /// <summary>
  /// Kick out khỏi hệ thống
  /// </summary>
  KickedOut = 1005,

  /// <summary>
  /// Lỗi hệ thống
  /// </summary>
  SystemError = 9999,

  UploadFileInvalidExtension = 101,
  UploadFileExceedingSize = 102,
  UploadFileInvalidImage = 103,

  AppointmentOverTime = 201,

  Offline = -1,

  // [Description("Dữ liệu không hợp lệ")]
  InvalidDataInput = 1004,

  /// <summary>
  /// Tên tài khoản hoặc mật khẩu không hợp lệ
  /// </summary>
  UserLoginFailed = 1006,

  /// <summary>
  /// Tài khoản đã bị khóa
  /// </summary>
  UserIsLock = 1007,

  /// <summary>
  /// page cha không được xóa
  /// </summary>
  PageParentIsNotDisable = 2001,

  /// <summary>
  /// token cũ chưa hết hạn
  /// </summary>
  TokenIsNotExpire = 1011
}
