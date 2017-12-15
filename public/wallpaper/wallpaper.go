package main

import (
	"fmt"
	"syscall"
	"unsafe"
)

const (
	// Windows constants
	SPI_SETDESKWALLPAPER uintptr = 0x0014
	WM_WININICHANGE      uintptr = 0x001A

	LibraryName  string = "user32.dll"
	FunctionName string = "SystemParametersInfoW"
)

func SetWallpaper(path string) bool {
	user32, _ := syscall.LoadLibrary(LibraryName)
	systemParameters, _ := syscall.GetProcAddress(user32, FunctionName)
	defer syscall.FreeLibrary(user32)

	fmt.Println(path)

	ret, _, err := syscall.Syscall6(
		uintptr(systemParameters),
		4,
		SPI_SETDESKWALLPAPER,
		0,
		uintptr(unsafe.Pointer(syscall.StringToUTF16Ptr(path))),
		WM_WININICHANGE,
		0,
		0,
	)

	fmt.Println(ret, err)

	return ret != 0
}

func main() {
	err := SetWallpaper("F:/o-restful/public/wallpaper/SeychellesCCSS_EN-US10430664838_1920x1080.jpg")
	fmt.Println(err)
}
