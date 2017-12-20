package main

import (
	"fmt"
	"path/filepath"
	"strings"
	"syscall"
	"unicode/utf16"
	"unsafe"
)

func mustLoadLibrary(name string) uintptr {
	lib, err := syscall.LoadLibrary(name)
	if err != nil {
		panic(err)
	}

	return uintptr(lib)
}

func mustGetProcAddress(lib uintptr, name string) uintptr {
	addr, err := syscall.GetProcAddress(syscall.Handle(lib), name)
	if err != nil {
		panic(err)
	}

	return uintptr(addr)
}

func systemParametersInfo(uiAction, uiParam uint32, pvParam unsafe.Pointer, fWinIni uint32) bool {
	const (
		libraryName  = "user32.dll"
		functionName = "SystemParametersInfoW"
	)

	user32 := mustLoadLibrary(libraryName)
	systemParameters := mustGetProcAddress(user32, functionName)

	ret, _, _ := syscall.Syscall6(systemParameters, 4,
		uintptr(uiAction),
		uintptr(uiParam),
		uintptr(pvParam),
		uintptr(fWinIni),
		0,
		0,
	)

	return ret != 0
}

func getWallpaper() string {
	// the maximum length of a windows path is 256 utf16 characters
	var filename [256]uint16
	ok := systemParametersInfo(
		spiGetDeskWallpaper,
		uint32(cap(filename)),
		// the memory address of the first byte of the array
		unsafe.Pointer(&filename[0]),
		0,
	)
	if !ok {
		return ""
	}
	return strings.Trim(string(utf16.Decode(filename[:])), "\x00")
}

func setWallpaper(path string) bool {
	const (
		SPI_GETSCREENSAVEACTIVE  = 0x0010
		SPI_SETSCREENSAVEACTIVE  = 0x0011
		SPI_SETSCREENSAVETIMEOUT = 0x000F
		SPI_SETSCREENSAVESECURE  = 0x0077
		SPI_SETDESKWALLPAPER     = 0x0014
	)
	ext := filepath.Ext(path)
	filepath, err := syscall.UTF16PtrFromString(path)

	fmt.Println(ext, path, filepath, err)
	fmt.Printf(path, filepath, filepath)

	ok := systemParametersInfo(
		SPI_SETDESKWALLPAPER,
		0x0000,
		unsafe.Pointer(filepath),
		0x01|0x02,
	)

	fmt.Println("set: ", ok)

	// fmt.Println("params: ", systemParameters, SPI_SETDESKWALLPAPER)

	fmt.Println("uintptr: ", uintptr(0), 0, uintptr(0x0014), uintptr(0x001A))

	return ok
}

// https://msdn.microsoft.com/en-us/library/windows/desktop/ms724947.aspx
const (
	spiGetDeskWallpaper = 0x0073
	spiSetDeskWallpaper = 0x0014

	uiParam = 0x0000

	spifUpdateINIFile = 0x01
	spifSendChange    = 0x02
)

func main() {
	cur := getWallpaper()
	fmt.Println(cur)

	// s := setWallpaper(`F:\o-restful\public\wallpaper\a.jpg`)
	s := setWallpaper("")
	fmt.Println(s)
}
