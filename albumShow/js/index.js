$(function(){
	var screenW = $(window).innerWidth();//获取可视区的宽高
	var screenH = $(window).innerHeight();
	var $albumList = $('.albumList');
	var $alertDanger = $('.alertDanger');
	var loadingImg = document.getElementById('loadingImg');
	var timer = null;
	var currentPid = 0;//记录当前层级的pid
	var fileId;
	var idList;
	var currentInfo;
	renderAlbum(currentPid);
	
	//渲染相册列表页
	function renderAlbum(currentPid){
		if(dataControl.isHasChild(data,currentPid)){
			$albumList.html(createFoldersHtml(data,currentPid));//渲染相册列表页
			setBigNailBg();
			var imgPoster = document.querySelectorAll('.imgPoster');
			for (var i = 0; i < imgPoster.length; i++) {
				setPosterImg(imgPoster[i],$('.albumBox').width(),$('.albumBox').height());
			}
			addAlbumMouseEvent();
		}else{
			$albumList.html(createDoraemon);
		}
	}
	var $eachAlbumInfo = $('.eachAlbumInfo');
	
	//为照片的上部按钮添加背景
	function setBigNailBg(){
		$.each($('.bigNail'), function(index,item) {
			item.style.backgroundImage = hotHookBg[index%hotHookBg.length].bgUrl
		});
	}
	
	//相册的移入、移出、点击事件
	function addAlbumMouseEvent(){
		$('.eachAlbumBox').mouseenter(function(){//文件夹移入事件
			$('.albumOpe .opeBtn').eq($(this).index()).show();
		});
        $('.eachAlbumBox').mouseleave(function(){//文件夹移除事件
        	$('.eachAlbumInfo .dropdownMenu').eq($(this).index('.eachAlbumInfo')).slideUp(200);
			$(this).find('.albumOpe .opeBtn').hide();
		});
		$('.albumOpe .opeBtn').click(function(){//文件夹内右上角按钮移入事件
			clearTimeout(timer);
			$('.eachAlbumInfo .dropdownMenu').eq($('.albumOpe .opeBtn').index($(this))).slideDown(200);
			return false;
		});
		$('.albumOpe .opeBtn').mouseleave(function(e){//文件夹内右上角按钮移出事件
			$this = $(e.target);
			timer = setTimeout(function(){
				$('.eachAlbumInfo .dropdownMenu').eq($('.albumOpe .opeBtn').index($this)).slideUp(200);
			},200);
		});
		$('.eachAlbumInfo .dropdownMenu').delegate('li','click',function(){
			fileId = $(this).parent().data('index');
			idList = dataControl.getId(data,fileId);
			idList.unshift(fileId);
			currentPid = dataControl.getInfo(data,idList[0]).pid;
			dropDownMenuClick($(this),idList);
			return false;
		});
		$('.eachAlbumInfo .dropdownMenu').mouseenter(function(){//文件夹内下拉菜单移入事件
			clearTimeout(timer);
		});
		$('.eachAlbumInfo .dropdownMenu').mouseleave(function(){//文件夹内下拉菜单移出事件
			$dropMenu = $(this);
			timer = setTimeout(function(){
				$dropMenu.slideUp(200);
			},200);
		});
		
		//文件夹的点击事件，点击显示相册列表,同时头部导航显示更新
		$('.eachAlbumInfo').click(function(){
			var $this = $(this);
			currentPid = $this.data('fileId');
			$('.albumBtnList').hide();
			$('.photoBtnList').show();
			$('.photoBtnList .albumName').html(dataControl.getInfo(data,currentPid).fileName);
			var imgArr = dataControl.getSrc(data,currentPid);
			if(imgArr.length){
				setPosterImg(loadingImg,$('.loading').width(),$('.loading').height());
				var newImg = new Image();
				var loadNum = 0;
				newImg.src = imgArr[loadNum];
				imgLoad();
				function imgLoad(){
					newImg.onload = function(){
						loadNum++;
						console.log(loadNum);
						newImg.src = imgArr[loadNum];
						if(loadNum == imgArr.length){
							$albumList.html(createPhotosHtml(data,currentPid));//渲染相册列表页
							addPhotoMouseEvent();
							renderWaterFall();//瀑布流展示
							return;
						}
						imgLoad();
					}
				}
			}else{
				$albumList.html(createDoraemon());
			}
		})
	}
	
	var currentParentInfo;
	var currentLevelEles;
	var index;
	var imgInit;
	var isPreview = false;
	//照片的移入、移出、点击事件
	function addPhotoMouseEvent(){
		$('.eachPhoto').mouseenter(function(){
			$('.eachPhoto .checkbox').eq($(this).index()).show();
			$('.eachPhoto .albumOpe .opeBtn').eq($(this).index()).show();
		});
        $('.eachPhoto').mouseleave(function(){
        	$('.eachPhoto .dropdownMenu').eq($(this).index('.eachPhoto')).slideUp(200);
			$(this).find('.albumOpe .opeBtn').hide();
			//鼠标移开的时候，判断是否是选中状态，如果选中，保存选中状态且复选框不消失，未被选中，鼠标移开，复选框消失
			if($('.eachPhoto .checkbox').eq($(this).index()).hasClass('checked')){
				$('.eachPhoto .checkbox').eq($(this).index()).show();
			} else {
				$('.eachPhoto .checkbox').eq($(this).index()).hide();
			}
		});
		$('.eachPhoto .albumOpe .opeBtn').click(function(){
			clearTimeout(timer);
			$('.eachPhoto .dropdownMenu').eq($('.eachPhoto .albumOpe .opeBtn').index($(this))).slideDown(200);
			return false;
		});
		$('.eachPhoto .albumOpe .opeBtn').mouseleave(function(e){
			$this = $(e.target);
			timer = setTimeout(function(){
				$('.eachPhoto .dropdownMenu').eq($('.eachPhoto .albumOpe .opeBtn').index($this)).slideUp(200);
			},100);
		});
		$('.eachPhoto .dropdownMenu').delegate('li','click',function(){
			fileId = $(this).parent().data('index');
			idList = [];
			idList.unshift(fileId);
			currentPid = dataControl.getInfo(data,idList[0]).pid;
			dropDownMenuClick($(this),idList);
			return false;
		});
		$('.eachPhoto .dropdownMenu').mouseenter(function(){
			clearTimeout(timer);
		});
		$('.eachPhoto .dropdownMenu').mouseleave(function(){
			$dropMenu = $(this);
			timer = setTimeout(function(){
				$dropMenu.slideUp(200);
			},200);
		});
		//checkbox的点击事件，如果未被选中，点击选中，再点击取消选中
		$('.eachPhoto .checkbox').click(function(){
			$(this).toggleClass('checked'); 
			var checkBoxLength = $('.eachPhoto .checkbox').length;
			var checkedLength = $('.eachPhoto .checked').length;
			if(checkedLength != 0){
				if(checkedLength == checkBoxLength){
					$('#checkAll').addClass('checkAllChecked');
				} else {
					$('#checkAll').removeClass('checkAllChecked');
				}
				showHeader();
			} else {
				$('#checkAll').className = 'checkAll';
				hideHeader();
			}
			return false;
		});
		
		//照片的点击事件，出现遮罩层，图片放大
		$('.eachPhoto').click(function(){
			isPreview = true;
			maskLayerSettings();
			fileId = $(this).data('fileId');
			//根据当前的fileId找到所需要的所有信息（当前文件名，当前图片地址，当前父级文件名，当前层级所有的图片地址）
			currentInfo = dataControl.getInfo(data,fileId);
			currentPid = currentInfo.pid;
			currentParentInfo = dataControl.getInfo(data,currentPid);
			currentLevelEles = dataControl.getChildId(data,currentPid);
			index = currentLevelEles.indexOf(currentInfo);
			//获取浏览图片的img标签，因为要根据所更换的图片的不同尺寸获取图片的真实宽高，来决定显示图片的宽高及位置，所以使用原生js（！！）
			imgInit = document.querySelector('.previewPhoto');
			renderReviewPhoto(imgInit,index,currentLevelEles,currentParentInfo);
		});
	};
	
	//下一张
	$('.next').click(function(){
		next();
		return false;
	});
	//上一张
	$('.prev').click(function(){
		prev();
		return false;
	});
	//预览关闭
	$('#maskLayer .maskLayerClose').click(function(){
		if($('#maskLayer').hasClass('animated zoomIn')){
			$('#maskLayer').removeClass('animated zoomIn');
		}
		$('#maskLayer').addClass('animated zoomOut');
		setTimeout(function(){
			$('#maskLayer').hide();
		},800);
		isPreview = false;
	});

	//键盘切换上一张，下一张
	$(window).keydown(function(e){
		if(isPreview){
			switch (e.which){
				case 37:
					prev();
					break;
				case 39:
					next();
					break;
			}
		}
	});
	
	//上一张
	function next(){
		index ++;
		$('.previewTipBox').hide();
		if(index > currentLevelEles.length - 1){
			index = currentLevelEles.length - 1;
			$('.previewTipBox').show();
			$('.previewTipBox .tipInfo').html('已是当前相册最后一张了');
		}
		renderReviewPhoto(imgInit,index,currentLevelEles,currentParentInfo);
	}
	
	//下一张
	function prev(){
		index --;
		$('.previewTipBox').hide();
		if(index < 0){
			index = 0;
			$('.previewTipBox').show();
			$('.previewTipBox .tipInfo').html('已是当前相册第一张了');
		}
		renderReviewPhoto(imgInit,index,currentLevelEles,currentParentInfo);
	}
	
	//点击提示框关闭按钮
	$('.previewTipBox .closeTipBox').click(function(){
		$('.previewTipBox').hide();
	});
	
	//阻止canvas的mousedown事件冒泡
	$('.eachAlbumInfo').mousedown(function(){
		return false;
	});
	$('.eachPhoto').mousedown(function(){
		return false;
	});
	
	//有选中图片，点击删除按钮
	$('#deleteBtn').click(function(){
		idList = dataControl.getFileId($('.eachPhoto .checked'),'fileId');
		if(!idList.length){
			showTipBox($('.warnTipBox'),'没有要删除的数据');
			return;
		}
		$('.commonBg').show();
		setObjCenter($('.deleteBox'));
		$('.deleteBox .deleteInfo').html('确定要删除这些照片吗？共<strong>'+ idList.length +'</strong>张');
		showModal($('.deleteBox'),'animated zoomOutDown','animated fadeInDown');
	});
	
	//点击移动到按钮
	$('#moveToBtn').click(function(){
		idList = dataControl.getFileId($('.eachPhoto .checked'),'fileId');
		if(!idList.length){
			showTipBox($('.successTipBox'),'没有要移动的数据');
			return;
		}
		$('.commonModal .modalTitle').html('移动到');
		$('.commonModal .smallAlbumList').html(createMoveToBox(data,0));
		$('.commonModal .modalConfirm').html('移动');
		showCommonModal();
	});
	
	//给模态框遮罩层设置宽高
	$('.modal').css({
		width: $(window).innerWidth(),
		height: $(window).innerHeight()
	});
	
	/*
	 * 创建相册
	 * 	点击创建相册按钮，出现模态框
	 * 	点击关闭、取消、确定按钮分别关闭模态框，并清除表单数据
	 */
	$('#createAlbumBtn').on('click', function(){
		$('.modal .modalTitle').html('创建相册');
		showModal($('.modal'),'animated slideOutUp','animated slideInDown');
		setObjCenter($('.modal .modalContent'));
    })
	
	$('#btnCancel').on('click',function(){
		hideModal($('.modal'),'animated slideInDown','animated slideOutUp');
		clearForm();
	});
	
	$('#modalClose').on('click',function(){
		hideModal($('.modal'),'animated slideInDown','animated slideOutUp');
		clearForm();
	});
	
	/**
	 * 点击确认按钮
	 * 	关闭模态框
	 * 	填完表单后，提交进行重命名检测
	 * 	添加文件夹
	 * 	清空表单数据
	 */	
	$('#btnConfirm').on('click',function(){
		var $albumNameV = $('#albumName').val();
		var $albumDescV = $('#albumDesc').val();
		var $albumTypeV = $('#albumType').val();
		
		if($('.modal .modalTitle').html() == '创建相册'){
			if($albumNameV == ""){
				$alertDanger.html("相册名称不能为空！！");
				$alertDanger.fadeIn();
				return;
			}else{
				if(dataControl.isCurLevelFileNameRep($albumNameV, data, currentPid)){
					$alertDanger.html("该名称的相册已经存在！");
					$alertDanger.fadeIn();
					return;
				};
			}
			createAlbum($albumNameV,$albumDescV,$albumTypeV);
		}
		
		if($('.modal .modalTitle').html() == '编辑相册'){
			if($albumNameV == ""){
				$alertDanger.html("相册名称不能为空！！");
				$alertDanger.fadeIn();
				return;
				
			}else{
				if($albumNameV != currentInfo.fileName){
					if(dataControl.isCurLevelFileNameRep($albumNameV, data, currentPid)){
						$alertDanger.html("该名称的相册已经存在！");
						$alertDanger.fadeIn();
						return;
					};
				} 
			}
			editAlbum($albumNameV,$albumDescV,$albumTypeV);
		}
		hideModal($('.modal'),'animated slideInDown','animated slideOutUp');
		renderAlbum(0);
		showTipBox($('.successTipBox'),$('.modal .modalTitle').html()+"成功",800,1500);
		clearForm();//每次添加完成或者点击取消或关闭按钮，清空表单里的数据
	});
	
	//创建相册
	function createAlbum(albumNameV,albumDescV,albumTypeV){
		var newData = {
        	id: dataControl.getMaxId(data) + 1,
		  	pid: 0,
		  	fileName: albumNameV,
		  	fileType: "folder",
		  	fileDesc: albumDescV,	
		  	albumType: albumTypeV,
		  	posterId:0,
		  	posterSrc:"../images/pic-none.png",
		  	createTime:new Date()
        };
        data.push(newData);
	}
	
	//编辑相册
	function editAlbum(albumNameV,albumDescV,albumTypeV){
		//更改数据
		dataControl.changeFileInfo(idList[0],albumNameV,albumDescV,albumTypeV);
	}
	
	//点击全选按钮，如果未被选中，点击选中且所有checkbox被选中。
	$('#checkAll').click(function(){
		if($(this).hasClass('checkAllChecked')){
			$(this).removeClass('checkAllChecked');
			$('.eachPhoto .checkbox').removeClass('checked').hide();
			hideHeader();
		} else {
			$(this).addClass('checkAllChecked');
			$('.eachPhoto .checkbox').show().addClass('checked');
			showHeader();
		}
		return false;
	});
	
	//点击导航"相册"，头部消失，导航消失，同时渲染列表
	$('.photoBtnList .totalName').click(function(){
		hideHeader();
		$('#checkAll').removeClass('checkAllChecked');
		currentPid = 0;
		$('.albumBtnList').show();
		$('.photoBtnList').hide();
		renderAlbum(0);
	});
	
	function showModal(obj,removeClass,addClass){
		if($(obj).hasClass(removeClass)){
			$(obj).removeClass(removeClass);
		}
		if($(obj).hasClass(addClass)){
			$(obj).removeClass(addClass);
		}
       	$(obj).addClass(addClass).show();
	}
	
	//点击取消、关闭、确定按钮模态框消失
	function hideModal(obj,removeClass,addClass){
		$(obj).removeClass(removeClass);
		$(obj).addClass(addClass);
	}
	
	function closeModal(obj,addClass){
		$(obj).addClass(addClass);
		setTimeout(function(){
			$(obj).removeClass(addClass);
			$(obj).hide();
		},1000);
	}
	
	//显示操作成功以后的提示框
	function showTipBox(obj,tipInfo,showTime,hideTime){
		$(obj).find('.tipInfo').html(tipInfo);
		tipInfo = tipInfo || "成功";
		showTime = showTime || 1000;
		hideTime = hideTime || 2000; 
		setTimeout(function(){
			$(obj).slideDown();
		},showTime);
		setTimeout(function(){
			$(obj).slideUp();
		},hideTime);
	}
	
	//删除、移动以后渲染数据
	function reRenderData(currentPid){
		if(dataControl.isHasChild(data,currentPid)){
			$albumList.html(createPhotosHtml(data,currentPid));//渲染相册列表页
			$('.eachPhoto').removeClass('animated flipInX');
			addPhotoMouseEvent();
			renderWaterFall();
		} else {
			$albumList.html(createDoraemon());
			dataControl.setPosterNone(currentPid);
		}
	}
	
	function dropDownMenuClick(target,idList){
		//照片-设置成封面
		if($(target).hasClass('makeAsPoster')){
			dataControl.makeAsPoster(idList[0],currentPid);
			showTipBox($('.successTipBox'),'设置成功',1000,2000);
		}
		//移动到
		if($(target).hasClass('moveTo')){
			$('.commonModal .modalTitle').html('移动到');
			$('.commonModal .smallAlbumList').html(createMoveToBox(data,0));
			$('.commonModal .modalConfirm').html('移动');
			showCommonModal();
		}
		//删除单个照片
		if($(target).hasClass('deletePhoto')){
			setObjCenter($('.deleteBox'));
			showModal($('.deleteBox'),'animated zoomOutDown','animated fadeInDown');
			$('.deleteBox .deleteInfo').html('确定要删除此照片吗？');
		}
		//删除相册
		if($(target).hasClass('deleteAlbum')){
			var photoNum = idList.length - 1;
			if(photoNum == 0){
				dataControl.deleteAlbum(data,idList);
				renderAlbum(currentPid);
			} else {
				setObjCenter($('.deleteBox'));
				showModal($('.deleteBox'),'animated zoomOutDown','animated fadeInDown');
				$('.deleteBox .deleteInfo').html('确定要删除此相册吗？共<strong>'+ photoNum +'</strong>张照片');
			}
		}
		//相册-设置封面
		if($(target).hasClass('makePoster')){
			if(idList.length == 1){
				showTipBox($('.warnTipBox'),'没有照片可设置封面',800);
				return;
			}
			$('.commonModal .modalTitle').html('设置封面');
			$('.commonModal .smallAlbumList').html(createMakePBox(data,idList[0]));
			$('.commonModal .modalConfirm').html('确定');
			showCommonModal();
		}
		//编辑相册
		if($(target).hasClass('editAlbum')){
			currentInfo = dataControl.getInfo(data,idList[0]);
			showModal($('.modal'),'animated slideOutUp','animated slideInDown');
			setObjCenter($('.modal .modalContent'));
			$('.modal .modalTitle').html('编辑相册');
			$('#albumName').val(currentInfo.fileName);
			$('#albumDesc').val(currentInfo.fileDesc);
			$('#albumType').val(currentInfo.albumType);
		}
	}
	
	//点击"移动到"和"移动到相册"按钮，moveToBox出现
	function showCommonModal(){
		setObjCenter($('.commonModal'));
		$('.commonBg').show();
		showModal($('.commonModal'),'animated fadeOutRight','animated fadeInLeft');
		var showImg = document.querySelectorAll('.showImg');
		for (var i = 0; i < showImg.length; i++) {
			setPosterImg(showImg[i],$('.liW').width(),$('.liW').height());
		}
		$('.commonModal li').click(function(){
			$('.commonModal .commonCheckBox').removeClass('commonChecked');
			$('.commonModal li').removeClass('active');
			$('.commonModal .commonCheckBox').eq($(this).index()).toggleClass('commonChecked');
			$('.commonModal li').eq($(this).index()).toggleClass('active');
		});
	}
	
	//点击移动到的确认按钮
	$('.commonModal .modalConfirm').click(function(){
		var destFileId = $('.commonModal .active').data('fileId');
		if($('.commonModal .modalTitle').html() == '移动到'){
			if(!destFileId){
				$('.dangerInfo').html('请选择目标文件').fadeIn();
				return;
			}
			if(destFileId == currentPid){
				$('.dangerInfo').html('目标文件夹与当前文件夹相同，请重新选择！').fadeIn();
				return;
			};
			dataControl.changePid(idList,destFileId,currentPid);
			dataControl.changeNonePoster(destFileId);
			reRenderData(currentPid);
			hideHeader();
			$('#checkAll').removeClass('checkAllChecked');
			showTipBox($('.successTipBox'),'移动成功',1000);
		} else if($('.commonModal .modalTitle').html() == '设置封面'){
			var currentPosterId = dataControl.getInfo(data,idList[0]).posterId;
			if(!destFileId){
				$('.dangerInfo').html('请选择要设置为封面的图片').fadeIn();
				return;
			}
			if(destFileId == currentPosterId){
				$('.dangerInfo').html('当前图片已是封面').fadeIn();
				return;
			};
			dataControl.makeAsPoster(destFileId,idList[0]);
			showTipBox($('.successTipBox'),'设置成功',800,1500);
			renderAlbum(currentPid);
		}
		$('.commonBg').hide();
		hideModal($('.commonModal'),'animated fadeInLeft','animated fadeOutRight');
		$('.dangerInfo').html('').hide();
		$('.commonCheckBox').removeClass('commonChecked');
		hideHeader();
		$('#checkAll').removeClass('checkAllChecked');
	});
	
	//关闭按钮
	$('.commonModal .modalClose').click(function(){
		$('.commonBg').hide();
		$('.dangerInfo').html('').hide();
		closeModal($('.commonModal'),'animated zoomOut');
	});
	
	//删除关闭按钮
	$('.deleteBox .modalClose').click(function(){
		$('.commonBg').hide();
		closeModal($('.deleteBox'),'animated zoomOut');
	});
	
	//删除确认按钮
	$('.deleteConfirm').click(function(){
		if(dataControl.isAlbum(idList[0])){
			dataControl.deleteAlbum(data,idList);
			renderAlbum(currentPid);
		} else {
			dataControl.deleteData(data,idList,currentPid);
			reRenderData(currentPid);
			hideHeader();
			$('#checkAll').removeClass('checkAllChecked');
		}
		
		hideModal($('.deleteBox'),'animated zoomInDown','animated zoomOutDown');
		$('.commonBg').hide();
		showTipBox($('.successTipBox'),'删除成功',1300);
	});
	
	//删除取消按钮
	$('.deleteCancel').click(function(){
		closeModal($('.deleteBox'),'animated zoomOut');
		$('.commonBg').hide();
	});
	
	//添加和编辑框拖拽
	drag($('.modal .modalHeader'),$('.modal .modalContent'));
	//封面和移动框拖拽
	drag($('.commonModal .modalHeader'),$('.commonModal'));
	//删除框拖拽
	drag($('.deleteBox .modalHeader'),$('.deleteBox'));
	
	//拖拽
	function drag(obj1,obj2){
		obj2 = obj2 || obj1;
		var isMove = false;
		var disX;
		var disY;
		$(obj1).mousedown(function(e){
			isMove = true;
			disX = e.pageX - $(this).offset().left;
			disY = e.pageY - $(this).offset().top;
			return false;
		});
		$(document).mousemove(function(e){
			if(isMove){
				var L = e.pageX - disX;
				var T = e.pageY - disY;
				$(obj2).css({
					left: L,
					top: T
				});
			}
		});
		$(document).mouseup(function(){
			isMove = false;
		});
	}
	
	//点击相册，渲染相册列表(瀑布流)
	function renderWaterFall(){
		$("#photoList").pinterestGrid({
			paddingX: 8,
            paddingY: 8,
            columnNum: 6,
            marginBottom: 10,
            singleColumnBreakpoint:100
		});
	}
	
	//清空表单
	function clearForm(){
		$('#albumName').val('');    
		$('#albumDesc').val('');    
		$('#albumType').val('旅游');  
		$alertDanger.hide();
	}
	
	//照片缩略图相关设置
	function maskLayerSettings(){
		$('#maskLayer').css({
			width: $(window).innerWidth(),
			height: $(window).innerHeight()
		}).show();
		
		if($('#maskLayer').hasClass('animated zoomOut')){
			$('#maskLayer').removeClass('animated zoomOut');
		}
		if($('#maskLayer').hasClass('animated zoomIn')){
			$('#maskLayer').removeClass('animated zoomIn');
		}
		$('#maskLayer').addClass('animated zoomIn');
		//图片和底部按钮的高度 = 可视区的高 - 头部的高
		$('#previewPic').css({
			height: $(window).innerHeight() - $('.maskLayerHeader').height()
		});
		
		$('#maskLayer .previewPicOpe').css({
			left: ($(window).innerWidth() - $('.previewPicOpe').width()) / 2
		});
		
	}
	
	//点击图片缩略图的header部分
	function renderReviewPhoto(obj,index,currentLevelEles,currentParentInfo){
		var currentSrc = currentLevelEles[index].src;
		var currentFileName = currentLevelEles[index].fileName;
		var albumName = currentParentInfo.fileName;
		//赋值
		$('#maskLayer .photoName_albumName').html(currentFileName + ' - ' + albumName);
		$('#maskLayer .photoIndex_photoCount').html((index + 1) + ' / ' + currentLevelEles.length);
		$('#maskLayer .previewPhoto').attr('src',currentSrc);
		
		obj.setAttribute('src',currentSrc);
		obj.onload = function(){
			settingImgPos(this);
		}
	}
	
	/**
	 * 获取图片原图的宽高，跟可视区的宽高相比：
	 * 	如果宽和高都小于可视区的宽高，显示的宽高就是原图的宽高；
	 * 	如果宽度或高度任意一方大于可视区的宽度或高度，而另一方小于可视区，则小的跟随大的一方同时按比例缩小；
	 * 	如果宽高都大于可视区的宽高，则显示图片的宽高，也根据大的一方按比例缩小。
	 */
	var naturalW,naturalH,wPer,hPer,maxPer,showW,showH,showT,showL;
	function settingImgPos(obj){
		naturalW = obj.naturalWidth;
		naturalH = obj.naturalHeight;
		
		wPer = naturalW / screenW;
		hPer = naturalH / $('#previewPic').height();
		
		if(wPer < 1 && hPer < 1){
			showW = naturalW;
			showH = naturalH;
		} else {
			maxPer = Math.max(wPer,hPer);
			showW = naturalW / maxPer;
			showH = naturalH / maxPer;
		}
		
		showT = Math.abs(($('#previewPic').height() - showH) / 2);
		showL = Math.abs((screenW - showW) / 2);
		$('.previewPhoto').css({
			width: showW,
			height: showH,
			left: showL,
			top : showT
		});
	}
	
	//有被选中的图片就显示右侧按钮和中间的显示信息
	function showHeader(){
		$('.selectInfo .checkedNum').html($('.eachPhoto .checked').length);
		$('.photoBtnList .otherOpe').show();
		$('.photoBtnList .selectInfo').show();
	}
	function hideHeader(){
		$('.photoBtnList .otherOpe').hide();
		$('.photoBtnList .selectInfo').hide();
	}
	
	//设置一个通用的遮罩层
	$('.commonBg').css({
		width: screenW,
		height: screenH
	});
	
	//将要显示的某box设为居中
	function setObjCenter(obj){
		$(obj).css({
			left: (screenW - $(obj).width()) / 2,
			top :(screenH - $(obj).height()) / 2,
		});
	}
	
	//图片封面大小问题（应当根据外层div大小按比例缩放，铺满外层div）
	function setPosterImg(obj,parentW,parentH){
		obj.onload = function(){
			var naturalW = obj.naturalWidth;
			var naturalH = obj.naturalHeight;
			var wPer = naturalW / parentW;
			var hPer = naturalH / parentH;
			var showPer = Math.min(wPer,hPer);
			var showW = naturalW / showPer;
			var showH = naturalH / showPer;
			var L = (parentW - showW) / 2;
			var T = (parentH - showH) / 2;
			obj.style.width = showW + 'px';
			obj.style.height = showH + 'px';
			obj.style.left = L + 'px';
			obj.style.top = T + 'px';
		}
	}
	
	//关于背景音乐
	var myAudio = document.querySelector('#myAudio');
	var songIndex = 0;
	renderAudioPlay();
	$('#playPause').click(function(){
		if(myAudio.paused){
			$(this).removeClass('play');
			$(this).addClass('pause');
			myAudio.play();
			$(this).attr('title','暂停');
		} else {
			$(this).removeClass('pause');
			$(this).addClass('play');
			myAudio.pause();
			$(this).attr('title','播放');
		}
	});
	
	$('#prevSong').click(function(){
		songIndex--;
		if(songIndex < 0){
			songIndex = bgSong.length - 1;
		}
		renderAudioPlay();
		changePlayStatus();
	});
	
	$('#nextSong').click(function(){
		songIndex ++;
		if(songIndex > bgSong.length - 1){
			songIndex = 0;
		}
		renderAudioPlay();
		changePlayStatus();
	});
	
	function renderAudioPlay(){
		$('#myAudio').attr('src',bgSong[songIndex].songSrc);
		$('.songName').html(bgSong[songIndex].songName);
	}
	
	function changePlayStatus(){
		if($('#playPause').hasClass('play')){
			myAudio.pause();
		} else {
			myAudio.play();
		}
	}
	var rightNum = 0;
	var timerSong = setInterval(function(){
		rightNum ++;
		if(rightNum > $('.songNameBox').width()){
			rightNum = 0;
		}
		$('.songName').css({
			right: rightNum
		});
	},30);
	$('.musicBg').mouseenter(function(){
		$('.music').fadeIn(1500);
	});
	$('.musicBg').mouseleave(function(){
		$('.music').fadeOut(1000);
	});
	
	//设置loading图
	$('.loading').css({
		left: (screenW - $('.loading').width()) / 2,
		top: 200
	});
	
	//禁止右键菜单
	document.oncontextmenu = function(){
		return false;
	}
	
	$('.container').mousedown(function(){
		return false;
	});
	
	//项目简介
	setObjCenter($('.programProduction'));
	$('#programProduction').click(function(){
		$('.commonBg').show();
		showModal($('.programProduction'),'animated slideOutUp','animated slideInDown');
	});
	drag($('.programProduction'));
	$('.closeBtn').click(function(){
		$('.commonBg').hide();
		hideModal($('.programProduction'),'animated slideInDown','animated slideOutUp');
	});
})