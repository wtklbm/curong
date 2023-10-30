Option Explicit
Dim sourceFilePath, shortcutFolderPath, shortcutName, arguments, description, workingDirectory, iconPath, windowMode, hotkey

sourceFilePath = WScript.Arguments(0)
shortcutFolderPath = WScript.Arguments(1)
shortcutName = WScript.Arguments(2)
arguments = WScript.Arguments(3)
description = WScript.Arguments(4)
workingDirectory = WScript.Arguments(5)
iconPath = WScript.Arguments(6)
windowMode = WScript.Arguments(7)
hotkey = WScript.Arguments(8)

Dim shell, desktopPath, shortcut
Set shell = CreateObject("WScript.Shell")

If shortcutFolderPath = "" Then
    shortcutFolderPath = shell.SpecialFolders("Desktop")
End If

Set shortcut = shell.CreateShortcut(shortcutFolderPath + "\" + shortcutName + ".lnk")

shortcut.Arguments = arguments
shortcut.Description = description
shortcut.TargetPath = sourceFilePath
shortcut.WindowStyle = windowMode
shortcut.WorkingDirectory = workingDirectory
shortcut.Hotkey = hotkey

shortcut.Save
WScript.Quit 0
