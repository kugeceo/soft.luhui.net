@echo off
echo 正在将当前目录下所有.md文件后缀修改为.txt...
echo 当前工作目录: %cd%
echo.

rem 检查是否有.md文件
set "has_files=0"
for %%f in (*.md) do (
    set "has_files=1"
    goto :break_check
)
:break_check

if "%has_files%"=="0" (
    echo 错误: 未找到任何.md文件!
    echo.
    pause
    exit /b 1
)

rem 循环处理当前目录下所有.md文件
for %%f in (*.md) do (
    rem 检查文件是否存在
    if exist "%%f" (
        rem 尝试重命名并检查是否成功
        ren "%%f" "%%~nf.txt" >nul 2>&1
        if %errorlevel% equ 0 (
            echo 已修改: %%f -> %%~nf.txt
        ) else (
            echo 错误: 无法修改 %%f 可能被占用或无权限
        )
    ) else (
        echo 警告: %%f 不存在
    )
)

echo.
echo 处理完成！
pause
    