var data = [
	{
		id: 1,
	  	pid: 0,
	  	fileName: "玉渊潭",
	  	fileType: "folder",
	  	fileDesc: "玉渊潭一角",	
	  	albumType: "旅游",
	  	posterId: 10,
	  	posterSrc:"../upload/6.jpg",
	  	createTime:new Date(2016,10,26,10,10)
	},
	{
		id: 2,
	  	pid: 0,
	  	fileName: "银杏",
	  	fileType: "folder",
	  	fileDesc: "",	
	  	albumType: "美景",	
	  	posterId: 19,
	  	posterSrc:"../upload/15.jpg",
	  	createTime:new Date(2016,10,26,10,10)
	},
	{
		id: 3,
	  	pid: 0,
	  	fileName: "微博",
	  	fileType: "folder",
	  	fileDesc: "",	
	  	albumType: "卡通",	
	  	posterId: 28,
	  	posterSrc:"../upload/24.jpg",
	  	createTime:new Date(2016,10,26,10,10)
	},
	{
		id: 4,
	  	pid: 0,
	  	fileName: "微世界",
	  	fileType: "folder",
	  	fileDesc: "漫画里的世界",	
	  	albumType: "卡通",	
	  	posterId: 38,
	  	posterSrc:"../upload/34.jpg",
	  	createTime:new Date(2016,10,26,10,10)
	},
	{
		id: 5,
	  	pid: 1,
	  	fileName: "图片1",
	  	fileType: "image",
	  	fileDesc: "",	
	  	isPoster: false,
	  	src:"../upload/1.jpg",
	  	createTime:new Date(2016,10,26,10,10)
	},
	{
		id: 6,
	  	pid: 1,
	  	fileName: "图片2",
	  	fileType: "image",
	  	fileDesc: "",	
	  	isPoster: false,
	  	src:"../upload/2.jpg",
	  	createTime:new Date(2016,10,26,10,10)
	},
	{
		id: 7,
	  	pid: 1,
	  	fileName: "图片3",
	  	fileType: "image",
	  	fileDesc: "",	
	  	isPoster: false,
	  	src:"../upload/3.jpg",
	  	createTime:new Date(2016,10,26,10,10)
	},
	{
		id: 8,
	  	pid: 1,
	  	fileName: "图片4",
	  	fileType: "image",
	  	fileDesc: "",	
	  	isPoster: false,
	  	src:"../upload/4.jpg",
	  	createTime:new Date(2016,10,26,10,10)
	},
	{
		id: 10,
	  	pid: 1,
	  	fileName: "图片6",
	  	fileType: "image",
	  	fileDesc: "",	
	  	isPoster: true,
	  	src:"../upload/6.jpg",
	  	createTime:new Date(2016,10,26,10,10)
	},
	{
		id: 13,
	  	pid: 1,
	  	fileName: "图片9",
	  	fileType: "image",
	  	fileDesc: "",	
	  	isPoster: false,
	  	src:"../upload/9.jpg",
	  	createTime:new Date(2016,10,26,10,10)
	},
	{
		id: 17,
	  	pid: 2,
	  	fileName: "图片1",
	  	fileType: "image",
	  	fileDesc: "",	
	  	isPoster: false,
	  	src:"../upload/13.jpg",
	  	createTime:new Date(2016,10,26,10,10)
	},
	{
		id: 18,
	  	pid: 2,
	  	fileName: "图片2",
	  	fileType: "image",
	  	fileDesc: "",	
	  	isPoster: false,
	  	src:"../upload/14.jpg",
	  	createTime:new Date(2016,10,26,10,10)
	},
	{
		id: 19,
	  	pid: 2,
	  	fileName: "图片3",
	  	fileType: "image",
	  	fileDesc: "",	
	  	isPoster: true,
	  	src:"../upload/15.jpg",
	  	createTime:new Date(2016,10,26,10,10)
	},
	{
		id: 20,
	  	pid: 2,
	  	fileName: "图片4",
	  	fileType: "image",
	  	fileDesc: "",	
	  	isPoster: false,
	  	src:"../upload/16.jpg",
	  	createTime:new Date(2016,10,26,10,10)
	},
	{
		id: 21,
	  	pid: 2,
	  	fileName: "图片5",
	  	fileType: "image",
	  	fileDesc: "",	
	  	isPoster: false,
	  	src:"../upload/17.jpg",
	  	createTime:new Date(2016,10,26,10,10)
	},
	{
		id: 22,
	  	pid: 3,
	  	fileName: "图片1",
	  	fileType: "image",
	  	fileDesc: "",	
	  	isPoster: false,
	  	src:"../upload/18.jpg",
	  	createTime:new Date(2016,10,26,10,10)
	},
	{
		id: 23,
	  	pid: 3,
	  	fileName: "图片2",
	  	fileType: "image",
	  	fileDesc: "",	
	  	isPoster: false,
	  	src:"../upload/19.jpg",
	  	createTime:new Date(2016,10,26,10,10)
	},
	{
		id: 24,
	  	pid: 3,
	  	fileName: "图片3",
	  	fileType: "image",
	  	fileDesc: "",	
	  	isPoster: false,
	  	src:"../upload/20.jpg",
	  	createTime:new Date(2016,10,26,10,10)
	},
	{
		id: 25,
	  	pid: 3,
	  	fileName: "图片4",
	  	fileType: "image",
	  	fileDesc: "",	
	  	isPoster: false,
	  	src:"../upload/21.jpg",
	  	createTime:new Date(2016,10,26,10,10)
	},
	{
		id: 26,
	  	pid: 3,
	  	fileName: "图片5",
	  	fileType: "image",
	  	fileDesc: "",	
	  	isPoster: false,
	  	src:"../upload/22.jpg",
	  	createTime:new Date(2016,10,26,10,10)
	},
	{
		id: 27,
	  	pid: 3,
	  	fileName: "图片6",
	  	fileType: "image",
	  	fileDesc: "",	
	  	isPoster: false,
	  	src:"../upload/23.jpg",
	  	createTime:new Date(2016,10,26,10,10)
	},
	{
		id: 28,
	  	pid: 3,
	  	fileName: "图片7",
	  	fileType: "image",
	  	fileDesc: "",	
	  	isPoster: true,
	  	src:"../upload/24.jpg",
	  	createTime:new Date(2016,10,26,10,10)
	},
	{
		id: 29,
	  	pid: 3,
	  	fileName: "图片8",
	  	fileType: "image",
	  	fileDesc: "",	
	  	isPoster: false,
	  	src:"../upload/25.jpg",
	  	createTime:new Date(2016,10,26,10,10)
	},
	{
		id: 30,
	  	pid: 3,
	  	fileName: "图片9",
	  	fileType: "image",
	  	fileDesc: "",	
	  	isPoster: false,
	  	src:"../upload/26.jpg",
	  	createTime:new Date(2016,10,26,10,10)
	},
	{
		id: 31,
	  	pid: 4,
	  	fileName: "图片1",
	  	fileType: "image",
	  	fileDesc: "",	
	  	isPoster: false,
	  	src:"../upload/27.jpg",
	  	createTime:new Date(2016,10,26,10,10)
	},
	{
		id: 32,
	  	pid: 4,
	  	fileName: "图片2",
	  	fileType: "image",
	  	fileDesc: "",	
	  	isPoster: false,
	  	src:"../upload/28.jpg",
	  	createTime:new Date(2016,10,26,10,10)
	},
	{
		id: 33,
	  	pid: 4,
	  	fileName: "图片3",
	  	fileType: "image",
	  	fileDesc: "",	
	  	isPoster: false,
	  	src:"../upload/29.jpg",
	  	createTime:new Date(2016,10,26,10,10)
	},
	{
		id: 34,
	  	pid: 4,
	  	fileName: "图片4",
	  	fileType: "image",
	  	fileDesc: "",	
	  	isPoster: false,
	  	src:"../upload/30.jpg",
	  	createTime:new Date(2016,10,26,10,10)
	},
	{
		id: 35,
	  	pid: 4,
	  	fileName: "图片5",
	  	fileType: "image",
	  	fileDesc: "",	
	  	isPoster: false,
	  	src:"../upload/31.jpg",
	  	createTime:new Date(2016,10,26,10,10)
	},
	{
		id: 36,
	  	pid: 4,
	  	fileName: "图片6",
	  	fileType: "image",
	  	fileDesc: "",	
	  	isPoster: false,
	  	src:"../upload/32.jpg",
	  	createTime:new Date(2016,10,26,10,10)
	},
	{
		id: 37,
	  	pid: 4,
	  	fileName: "图片7",
	  	fileType: "image",
	  	fileDesc: "",	
	  	isPoster: false,
	  	src:"../upload/33.jpg",
	  	createTime:new Date(2016,10,26,10,10)
	},
	{
		id: 38,
	  	pid: 4,
	  	fileName: "图片8",
	  	fileType: "image",
	  	fileDesc: "",	
	  	isPoster: true,
	  	src:"../upload/34.jpg",
	  	createTime:new Date(2016,10,26,10,10)
	},
	{
		id: 39,
	  	pid: 4,
	  	fileName: "cartoonCake",
	  	fileType: "image",
	  	fileDesc: "",	
	  	isPoster: false,
	  	src:"../upload/cartoonCake.png",
	  	createTime:new Date(2016,10,26,10,10)
	}
];
