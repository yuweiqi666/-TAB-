var that;
class Tab{
    constructor(id) {
        that = this,
        this.main = document.querySelector(id),
        this.ul = this.main.querySelector('ul'),
        this.addBtn = this.main.querySelector('.tabadd span'),
        this.tabscon = this.main.querySelector('.tabscon'),
        this.init()
    }
    updateNode() {
        this.sections = this.main.querySelectorAll('section');
        this.lis = this.main.querySelectorAll('li');
        this.guanbiBtn = this.main.querySelectorAll('.icon-guanbi');
        this.textSpans = this.main.querySelectorAll('.firstnav ul li span:nth-child(1)')
    }
    init() {
        this.updateNode();
        for(var i = 0; i < this.lis.length; i++) {
            this.lis[i].setAttribute('index', i);
            this.lis[i].addEventListener('click', this.toggleTab);
            this.guanbiBtn[i].addEventListener('click', this.removeTab)
            this.textSpans[i].addEventListener('dblclick', this.editTab)
            this.sections[i].addEventListener('dblclick', this.editTab)
        }
        this.addBtn.addEventListener('click', this.addTab);
        
    }
    clearClass() {
        for(var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    toggleTab() {
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.getAttribute('index')].className = 'conactive';
    }
    addTab() {
        var random = Math.random();
        that.clearClass();
        var li = '<li class="liactive"><span>新增tab</span><span class="iconfont icon-guanbi"></span></li>';
        var section = '<section class="conactive">测试' + random + '</section>';
        that.ul.insertAdjacentHTML('beforeend', li);
        that.tabscon.insertAdjacentHTML('beforeend', section);
        that.init();
    }
    removeTab(e) {
        e.stopPropagation();
        var index = this.parentNode.getAttribute('index');
        that.ul.removeChild(this.parentNode);
        that.tabscon.removeChild(that.sections[index]);
        that.init();
        if(document.querySelector('.liactive')) {
            return false;
        }
        index--;
        that.lis[index] && that.lis[index].click();
    }
    editTab() {
        var title = this.innerHTML;
        this.innerHTML = '<input type="text" />';
        var input = this.children[0];
        input.value = title;
        //文本框中内容全选
        input.select();
        input.addEventListener('blur', function() {
            this.parentNode.innerHTML = this.value;
        })
        //键盘事件 按下回车失去焦点
        input.addEventListener('keyup', function(e) {
            if(e.keyCode === 13) {
                this.blur();
            }
        })
    }   
}

var tab = new Tab('#tab');