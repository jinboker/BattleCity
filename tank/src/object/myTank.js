// class Student extends People {
//     constructor(name, grade) { //构造函数
//         super(name);    //调用父类构造函数
//           this.grade = grade;
//     }
//     sayGrade() {
//           console.log(this.grade);
//     }
// }
//

// 奖励类型
let oBonus = {
	home : false,
	star : false,
	life : false,
	shield : false,
	boom : false,
	stop : false
}

class MyTank extends TankObj{
	// constructor(){
	// 	super();
	// }

	init(){
		this.dir = 0;          //己方坦克默认方向向下
		this.x = 128;
		this.y =  384;

		this.shieldDelay = new Delay();    //这个是用来控制防护罩变化的延迟

		//渲染出生时候的动画
		this.borned = false;              //坦克角色是否已经出生
		this.bornNumCont = false;         //是否允许this.bornNum开始累加计数
		this.bornChange = 0;
		this.bornNum = 0;                 //出生的动画循环的次数

		// 防护罩
		this.shieldLoopNumSet = true;         //是否设置防护罩的执行次数
		this.shieldNum = 0;                   //防护罩的执行次数
		this.shieldNumSave = 0;               //防护罩执行次数的保存
		this.shieldAble = false;              //是否具有防护罩
		this.shieldPicPos = 0;           //决定防护罩显示的是哪部分的图片
	}

	draw() {
		// 判断坦克是否需要出生
		if (!this.borned) {
			this.born();
			return;
		}
		// 按键判断
		if (keyPressed) {
			this.key();
			this.move();
		}
		// 防护罩（刚出生时候或者吃了防护罩的奖励）
		!this.shieldAble && this.shield();

		cxt.role.drawImage(oImg.myTank , 0 ,  0 + this.dir * 64 + this.wheel * 32 , 32 , 32 , this.x , this.y , 32 , 32);
	}

	key(){
		switch (true) {
			case keyStatus[keyNum.up1]:
				this.dir = 0;
				break;
			case keyStatus[keyNum.right1]:
				this.dir = 1;
				break;
			case keyStatus[keyNum.down1]:
				this.dir = 2;
				break;
			case keyStatus[keyNum.left1]:
				this.dir = 3;
				break;
			default:
				keyPressed = false;    //按键松开后再检查一遍按键，如果此时上下左右都没有被按下，不管有没有其他按键被按下都将这个值设置为假
				break;
		}
	}

	// 防护罩相关
	shield(){
		if (this.shieldLoopNumSet) {
			this.shieldNum = oBonus.shield ? 1000 : 200;   //如果有防护罩，则循环1000次，没有则循环200次
			this.shieldLoopNumSet = false;
		}
		if (this.shieldNumSave < this.shieldNum) {
			this.shieldNumSave ++;
			// 每隔3次循环改变一下防护罩的图片
			this.shieldDelay.do(() => this.shieldPicPos = +! this.shieldPicPos , 3);
			cxt.role.drawImage(oImg.misc , 32 + this.shieldPicPos * 32 , 0 , 32 , 32 , this.x , this.y , 32 , 32);
		} else {
			this.shieldNumSave = 0;
			this.shieldAble = true;
		}
	}
}