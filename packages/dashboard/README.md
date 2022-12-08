# DASHBOARD

适用 <https://github.com/issue9/cmfx> 的后台管理框架

## 错误处理

如果需要反馈错误信息，可以抛出 `Error` 或是 `ResponseError` 异常，
错误边界将会在最近的路由中对其进行处理。当然直接抛出字符串也能正常处理，
如果抛出是 `Error` 类型的异常，且在开发模式，错误页将会显示调用的堆栈信息。
