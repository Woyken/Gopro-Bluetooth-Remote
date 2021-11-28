/*
undocumented stuff
current group mode
0x2B (43)
00 - video mode
01 - photo mode
02 - time lapse mode


0x2C while in photo mode
00 - burst mode
01 - single shot
02 - night mode

0x2C while in video mode
03 - looping
00 - video


photo menu burst photo         2b 01 02    2c 01 00    48 01 13
photo menu photo               2b 01 01    2c 01 01    48 01 11
photo menu night               2b 01 01    2c 01 02    48 01 12    54 01 01   (54 - delay timer, 00 - no delay, 01 - 3s delay, 02 - 10s delay)


video menu video               2b 01 00    2c 01 00    47 01 0c
video menu looping             2b 01 00    2c 01 03    47 01 0f


timelapse menu timewarp        2b 01 00    2c 01 04    49 01 18
timelapse menu timelapsevideo  2b 01 00    2c 01 01    49 01 0d
timelapse menu timelapsephoto  2b 01 02    2c 01 01    49 01 14
timelapse menu nightpalsephoto 2b 01 02    2c 01 02    49 01 15



usb connected:
2b 01 07            2c 01 ff
Some kind of custom mode? weird, anyway, it disconnects right after the message anyway...

*/
