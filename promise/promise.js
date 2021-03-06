/**
 * @author [small pang]
 * @email [xudengwei.com]
 * @create date 2018-01-12 10:15:16
 * @modify date 2018-01-12 10:15:16
 * @desc [手写promise的实现封装 —— es6 babel]
*/

/**
 * promise的api方法：
 * promise construct
 * then
 * resolve/reject
 * catch
 * all
 * race: 顾名思义，Promse.race就是赛跑的意思，意思就是Promise.race([p1, p2, p3])里面哪个结果获得的快就返回那个结果
 * finally:
 * 
 * promise状态：
 * pending: 初始状态
 * fulfilled：操作成功完成
 * rejected：操作失败
 */
class Promise {
  constructor(func) {
    this.state = 'pending'; // fulfilled rejected
    this.value = '';
    this.resolves = []; // 等待执行的resolve队列
    this.rejects = []; // 等待执行的reject队列
    // resolve
    let resolve = (data) => {
      this.state = 'fulfilled';
      this.value = data;
      this.resolves.forEach((item, index, arr) => {
        item(this.value);
      })
    }
    // reject
    let reject = (data) => {
      this.state = 'rejected';
      this.value = data;
    }
    // func
    func(resolve, reject);
  }

  then(onResolve, onReject) {
    switch (this.state) {
    case 'pending':
      console.log('还是pending...');
      this.resolves.push(onResolve);
      this.rejects.push(onReject);
      break;
    case 'fulfilled':
      onResolve(this.value);
      break;
    case 'rejected':
      onReject(this.value);
      break;
    }
  }
}

// 稍后实现下catch、all、race、

