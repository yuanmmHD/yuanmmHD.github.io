var dataControl = {
	//获取当前文件夹下子元素
	getChildId: function(data,pid){
		var arr = [];
		for (var i = 0; i < data.length; i++) {
			if(data[i].pid == pid){
				arr.push(data[i]);
			}
		}
		return arr;
	},
	getId: function(data,pid){
		var arr = [];
		for (var i = 0; i < data.length; i++) {
			if(data[i].pid == pid){
				arr.push(data[i].id);
			}
		}
		return arr;
	},
	//获取当前文件夹的子集数目
	getChildNum: function(data,pid){
		return dataControl.getChildId(data,pid).length;
	},
	//获取当前元素的父元素
	getParent: function(data,currentId){
		var arr = [];
		for (var i = 0; i < data.length; i++) {
			if(data[i].id == currentId){
				arr.push(data[i]);
			}
		}
		return arr;
	},
	//获取当前文件夹下的图片路径
	getSrc: function(data,pid){
		var arr = [];
		for (var i = 0; i < data.length; i++) {
			if(data[i].pid == pid){
				arr.push(data[i].src);
			}
		}
		return arr;
	},
	//获取数据中最大的id
	getMaxId: function(data){
		var id = 0;
		for (var i = 0; i < data.length; i++) {
			if(data[i].id > id){
				id = data[i].id;
			}
		}
		return id;
	},
	//判断当前层级名称是否存在重复
	isCurLevelFileNameRep: function(value,data,id){
		var currentLevelData = dataControl.getChildId(data,id);
		for (var i = 0; i < currentLevelData.length; i++) {
			if(currentLevelData[i].fileName === value){
				return true;
				break;
			}
		}
		return false;
	},
	// 删除数据
	deleteData:function(data,deleteArr,currentPid){
		deleteArr = dataControl.sortIdList(deleteArr);
		var parentInfo = dataControl.getInfo(data,currentPid);
		for (var i = 0; i < data.length; i++) {
			for (var j = 0; j < deleteArr.length; j++) {
				dataControl.isPoster(deleteArr[j],parentInfo.posterId,currentPid);
				if(data[i].id == deleteArr[j]){
					data.splice(i,1);
				}
				dataControl.changeNonePoster(currentPid);
			}
		}
	},
	//删除相册
	deleteAlbum: function(data,deleteArr){
		deleteArr = dataControl.sortIdList(deleteArr);
		for (var i = 0; i < data.length; i++) {
			for (var j = 0; j < deleteArr.length; j++) {
				if(data[i].id == deleteArr[j]){
					data.splice(i,1);
				}
			}
		}
	},
	//判断是否是相册
	isAlbum: function(id){
		for (var i = 0; i < data.length; i++) {
			if(data[i].id == id && data[i].fileType == 'folder'){
				return true;
			}
		}
	},
	// 获取一组行间样式的data-file-id值
	getFileId: function(obj,dataFileId){
		var arr = [];
		for (var i = 0; i < obj.length; i++) {
			arr.push($(obj[i]).parent().data(dataFileId));
		}
		return arr;
	},
	//改变文件名称和描述
	changeFileInfo: function(id,newName,newDesc,newType){
		for (var i = 0; i < data.length; i++) {
			if(data[i].id == id){
				data[i].fileName = newName;
				data[i].fileDesc = newDesc;
				data[i].albumType = newType;
			}
		}
	},
	// 获取时间
	getDate:function(time){
		var time = time;
		var year = time.getFullYear();     // 年
		var month = time.getMonth() + 1;     // 月
		var day = time.getDate();	       // 日
		var hour = time.getHours()         // 时
		var minutes = time.getMinutes()    //分
		
		return '' + year + '-' + dataControl.dateFormat(month) + '-' + dataControl.dateFormat(day) +'   '+ dataControl.dateFormat(hour) +':'+ dataControl.dateFormat(minutes) +''
	},
	// 转换时间
	dateFormat: function(value){
		return value < 10 ? '0' + value : '' + value
	},
	//根据id获取对应的数据
	getInfo: function(data,id){
		for (var i = 0; i < data.length; i++) {
			if(data[i].id == id ){
				return data[i];
			}
		}
	},
	//判断是否有子级
	isHasChild: function(data,id){
		return dataControl.getChildId(data,id).length !== 0;
	},
	//改变父级id
	changePid: function(idList,destId,currentPid){
		var parentInfo = dataControl.getInfo(data,currentPid);
		for (var i = 0; i < data.length; i++) {
			for (var j = 0; j < idList.length; j++) {
				//如果当前文件在移动文件内，且当前文件为此相册的封面，移动后，将此相册的封面置空，同时，当前文件的isPoster设为false;
				dataControl.isPoster(idList[j],parentInfo.posterId,currentPid);
				if(data[i].id == idList[j]){
					data[i].pid = destId;
				}
			}
		}
		dataControl.changeNonePoster(currentPid);
	},
	//设置封面
	makeAsPoster: function(id,pid){
		dataControl.changeOldPosterId(pid);
		dataControl.changeCurPosterId(id);
		dataControl.changePosterIdSrc(id,pid);
	},
	//将原来的isPoster改为false
	changeOldPosterId: function(pid){
		var curParentInfo = dataControl.getInfo(data,pid);
		var oldPosterId = curParentInfo.posterId;
		for (var i = 0; i < data.length; i++) {
			if(oldPosterId != 0){
				if(data[i].id == oldPosterId){
					data[i].isPoster = false;
					break;
				}
			}
		}
	},
	//将当前点击图片的isPoster改为true
	changeCurPosterId: function(id){
		for (var i = 0; i < data.length; i++) {
			if(data[i].id == id){
				data[i].isPoster = true;
				break;
			}
		}
	},
	//将当前相册的posterId和posterSrc改为点击图片的id和src
	changePosterIdSrc: function(id,pid){
		var currentInfo = dataControl.getInfo(data,id);
		for (var i = 0; i < data.length; i++) {
			if(data[i].id == pid){
				data[i].posterId = id;
				data[i].posterSrc = currentInfo.src;
				break;
			}
		}
	},
	//从小到大排序
	sortIdList: function (arr){
		var newArr = arr.sort(function(a,b){
			return a - b;
		});
		return newArr;
	},
	//获取所有音乐的路径
	getSongSrc: function(){
		var arr = [];
		for (var i = 0; i < bgSong.length; i++) {
			arr.push(bgSong[i].songSrc);
		}
		return arr;
	},
	//把当前相册的封面设为空
	setPosterNone: function(pid){
		for (var i = 0; i < data.length; i++) {
			if(data[i].id == pid){
				data[i].posterId = 0;
				data[i].posterSrc = '../images/pic-none.png';
			}
		}
	},
	//移动完成后，如果当前文件有子级，且文件夹封面为空，设置子级的第一个为封面
	changeNonePoster: function(pid){
		if(dataControl.isHasChild(data,pid) && dataControl.getInfo(data,pid).posterId == 0){
			var currentChildren = dataControl.getChildId(data,pid);
			dataControl.makeAsPoster(currentChildren[0].id,pid);
		}
	},
	//判断被删除或者移动的文件是否是当前相册的封面
	isPoster: function(fileId,posterId,currentPid){
		if(fileId == posterId){
			dataControl.changeOldPosterId(currentPid); 	
			dataControl.setPosterNone(currentPid);
		}
	}
}
