// 递归无限层级数据根据code查找节点
const treeData = [{
  id: 151,
  code: 'BA01010000',
  children: [{
    id: 152,
    code: 'BA01020000',
    children: [{
      id: 153,
      code: 'BA01030000',
      children: [{
        id: 154,
        code: 'BA01040000',
        children: null,
        parentCode: 'BA01000000',
        name: '系统A-A-A-A',
        elementType: 1,
        systemType: 1,
        systemId: 30,
        visibleStatus: 2,
        validStatus: 2,
        url: '/managereport2/countryCostBenefitChart.do_',
        remark: '系统A-A-A-A',
        level: 2,
        sortId: 1,
        status: 1,
        creatorId: 2067,
        createdTime: '2019-08-07T10:02:12.000+0000',
        modifierId: 559,
        modifiedTime: '2019-08-15T03:29:53.000+0000',
        systemName: '系统A-A-A-A'
      }],
      parentCode: 'BA01000000',
      name: '系统A-A-A',
      elementType: 1,
      systemType: 1,
      systemId: 30,
      visibleStatus: 2,
      validStatus: 1,
      url: '/managereport2/countryCostBenefitChart.do_',
      remark: '系统A-A-A',
      level: 2,
      sortId: 1,
      status: 1,
      creatorId: 2067,
      createdTime: '2019-08-07T10:02:12.000+0000',
      modifierId: 559,
      modifiedTime: '2019-08-15T03:29:53.000+0000',
      systemName: '系统A-A-A'
    }],
    parentCode: 'BA01000000',
    name: '系统A-A',
    elementType: 1,
    systemType: 1,
    systemId: 30,
    visibleStatus: 1,
    validStatus: 1,
    url: '/managereport2/countryCostBenefitChart.do_',
    remark: '系统A-A',
    level: 2,
    sortId: 1,
    status: 1,
    creatorId: 2067,
    createdTime: '2019-08-07T10:02:12.000+0000',
    modifierId: 559,
    modifiedTime: '2019-08-15T03:29:53.000+0000',
    systemName: '系统A-A'
  }],
  parentCode: 'BA01000000',
  name: '系统A',
  elementType: 1,
  systemType: 1,
  systemId: 30,
  visibleStatus: 1,
  validStatus: 1,
  url: '/managereport2/countryCostBenefitChart.do_',
  remark: '系统A',
  level: 2,
  sortId: 1,
  status: 1,
  creatorId: 2067,
  createdTime: '2019-08-07T10:02:12.000+0000',
  modifierId: 559,
  modifiedTime: '2019-08-15T03:29:53.000+0000',
  systemName: '系统A'
}];

/**
 * 递归无限层级数据根据code查找节点
 * @param {*} list 列表数据
 * @param {*} code 权限码
 * 关于递归，一定要掌握好结束条件，懂得何时return，不然会出现返回不出值或者循环提前结束的情况
 */
const findNodeByCode = (list, code) => {
  let node = null;
  if(!list) return node;
  list.forEach(item => {
    if (item.code === code) return node = item;
    else if (item.children) {
      node = findNodeByCode(item.children, code);
      //关键，千万不要直接return本方法，不然即使没有返回值也会将返回return，导致最外层循环中断，直接返回undefined,要有返回值才return才对
      if(node) return (node, a = 3);
    }
  });
  return node;
}
let result = findNodeByCode(treeData, "BA01040000");
console.log(JSON.stringify(result, null, 2));
/*
{
  "id": 154,
  "code": "BA01040000",
  "children": null,
  "parentCode": "BA01000000",
  "name": "系统A-A-A-A",
  "elementType": 1,
  "systemType": 1,
  "systemId": 30,
  "visibleStatus": 2,
  "validStatus": 2,
  "url": "/managereport2/countryCostBenefitChart.do_",
  "remark": "系统A-A-A-A",
  "level": 2,
  "sortId": 1,
  "status": 1,
  "creatorId": 2067,
  "createdTime": "2019-08-07T10:02:12.000+0000",
  "modifierId": 559,
  "modifiedTime": "2019-08-15T03:29:53.000+0000",
  "systemName": "系统A-A-A-A"
}
*/
