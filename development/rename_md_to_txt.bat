@echo off
echo 正在将当前目录下所有.md文件后缀修改为.txt...
echo.

rem 循环处理当前目录下所有.md文件
for %%f in (*.md) do (
    rem 检查文件是否存在
    if exist "%%f" (
        rem 重命名文件，去掉.md后缀后加上.txt
        ren "%%f" "%%~nf.txt"
        echo 已修改: %%f -> %%~nf.txt
    )
)

echo.
echo 处理完成！
pause
    