//文件渲染列表
function folderHtml(fileData){
	var photoNum = dataControl.getChildNum(data,fileData.id);
	var html = '';
		html += `
				<div class="eachAlbumBox fl">
					<div class="dotHook">
						<div class="bigNail"></div>
						<div class="smallNail leftNail"></div>
						<div class="smallNail rightNail"></div>
						<div class="line leftLine"></div>
						<div class="line rightLine"></div>
					</div>
					<div class="eachAlbumInfo fl" data-file-id ="${fileData.id}" data-file-type="${fileData.fileType}" title="${fileData.fileDesc}">
						<div class="albumBox imgRounded">
							<div class="albumType">${fileData.albumType}</div>
							<img src="${fileData.posterSrc}" class="imgRounded imgPoster" />
							<div class="albumOpe">
								<span class="opeBtn">
									<i class="bg ico_ope"></i>
								</span>
								<ul class="dropdownMenu" data-index="${fileData.id}">
								  	<li class="editAlbum"><a href="javascript:;"><i class="bg ico_edit"></i> 编辑</a></li>
								  	<li class="makePoster"><a href="javascript:;"><i class="bg ico_cover"></i> 设置封面</a></li>
								  	<li class="deleteAlbum"><a href="javascript:;"><i class="bg ico_del"></i> 删除</a></li>
								</ul>
							</div>
							<span class="photoNum">${photoNum}</span>
						</div>
						<h3 class="albumName">${fileData.fileName}</h3>
					</div>
				</div>
	            `;
	return html;
};

//照片列表字符串
function createFoldersHtml(data,renderId){
	var children = dataControl.getChildId(data,renderId);
	var html = '';
	children.forEach(function(item){
		html += folderHtml(item);
	});
	return html;
}

function createAlbumElement(data){
	return folderHtml(data);
}

function photoHtml(fileData){
	var html = '';
		html += `
				<li class="eachPhoto animated flipInX" data-file-id ="${fileData.id}" data-file-type="${fileData.fileType}" title="${fileData.fileName}">
					<img src="${fileData.src}" class="photoSize">
					<div class="checkbox"></div>
					<div class="albumOpe">
						<span class="opeBtn">
							<i class="bg ico_ope"></i>
						</span>
						<ul class="dropdownMenu" data-index="${fileData.id}">
						  	<li class="makeAsPoster"><a href="javascript:;"><i class="bg ico_cover"></i> 设置为封面</a></li>
						  	<li class="moveTo"><a href="javascript:;"><i class="bg ico_moveTo"></i> 移动到相册</a></li>
						  	<li class="deletePhoto"><a href="javascript:;"><i class="bg ico_del"></i> 删除</a></li>
						</ul>
					</div>
					<span class="photoName">${fileData.fileName}</span>
				</li>
	            `;
	return html;
};

function createPhotosHtml(data,renderId){
	var children = dataControl.getChildId(data,renderId);
	var html = '<ul id="photoList">';
	children.forEach(function(item){
		html += photoHtml(item);
	});
	html += '</ul>';
	return html;
}

//创建哆啦A梦
function createDoraemon(){
	var html = `
				<div class="doraemon">
					<div class="header">
						<div class="face"></div>
						<div class="eye eyel">
							<div class="eyeBlack">
								<div class="eyeWhite"></div>
							</div>
						</div>
						<div class="eye eyer">
							<div class="eyeBlack">
								<div class="eyeWhite"></div>
							</div>
						</div>
						<div class="noseLine"></div>
						<div class="quilt"></div>
						<div class="nose">
							<div class="white"></div>
						</div>
						<div class="mouthBox">
							<div class="mouth"></div>
						</div>
						<div class="beard beard1"></div>
						<div class="beard beard2"></div>
						<div class="beard beard3"></div>
						<div class="beard beard4"></div>
						<div class="beard beard5"></div>
						<div class="beard beard6"></div>
					</div>
					<div class="neckBox">
						<div class="neck"></div>
					</div>
					<div class="bell">
						<div class="line"></div>
						<div class="linebg"></div>
						<div class="center"></div>
						<div class="top"></div>
						<div class="top2"></div>
					</div>
					<div class="arse">
						<div class="neck"></div>
					</div>
					<div class="tummy"></div>
					<div class="tail">
						<div class="circle"></div>
						<div class="lineBox" >
							<div class="line"></div>
						</div>
					</div>
					<div class="leg"></div>
					<div class="legbottomBox">
						<div class="legbottom"></div>
					</div>
					<div class="foot"></div>
					<div class="handr">
						<div class="line"></div>
						<div class="palm"></div>
					</div>
					<div class="handtop"></div>
					<div class="handlBox">
						<div class="handl">
							<div class="line"></div>
						</div>
					</div>
					<div class="palml"></div>
				</div>
				`;
	return html;			
}

//创建点击"移动到"按钮,每一个li
function createMoveToAlbum(fileData){
	var html = '';
		html += `
				<li class="fl liW" data-file-id ="${fileData.id}">
					<img class="showImg" src="${fileData.posterSrc}"/>
					<span class="commonCheckBox"></span>
					<span class="albumName">${fileData.fileName}</span>
				</li>
	            `;
	return html;
}
//将每个li添加到moveToBox的ul中
function createMoveToBox(data,renderId){
	var children = dataControl.getChildId(data,renderId);
	var html = '';
	children.forEach(function(item){
		html += createMoveToAlbum(item);
	});
	return html;
}
//点击设置封面按钮
function createMakePPhoto(fileData){
	var html = '';
		html += `
				<li class="fl liW" data-file-id ="${fileData.id}">
					<img class="showImg" src="${fileData.src}"/>
					<span class="commonCheckBox"></span>
					<span class="photoName">${fileData.fileName}</span>
				</li>
	            `;
	return html;
}
//将每个li添加到makePoster的ul中
function createMakePBox(data,renderId){
	var children = dataControl.getChildId(data,renderId);
	var html = '';
	children.forEach(function(item){
		html += createMakePPhoto(item);
	});
	return html;
}
