function getNode(node,context = document){

  // if(isString(context)) context = document.querySelector(context);

  // context가 document가 아니라면 querySelector를 돌아줘.
  // if()
  if(context.nodeType !== 9) context = document.querySelector(context);

  return context.querySelector(node);
}


// getNode를 통해서 대상을 던졌을때 바로 queryselector로 들어가는게 아님 컨텍스트

function getNodes(node,context = document){

  if(context.nodeType !== 9) context = document.querySelector(context);
  return context.querySelectorAll(node);
}