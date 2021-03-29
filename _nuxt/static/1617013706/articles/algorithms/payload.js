__NUXT_JSONP__("/articles/algorithms", (function(a,b,c,d,e,f,g,h){return {data:[{article:{title:"What are algorithms ?",excerpt:"An explanation of what algorithms are.",category:null,tags:["Algorithms Definition"],createdAt:"2017-08-05T14:00:00.000Z",updatedAt:"2020-08-16T05:11:06.309Z",enableComments:e,enableTOC:e,toc:[{id:f,depth:2,text:g}],body:{type:"root",children:[{type:b,tag:d,props:{},children:[{type:a,value:"The world hardly needs another definition of the word algorithm, but here I go anyway: "},{type:b,tag:"strong",props:{},children:[{type:b,tag:"em",props:{},children:[{type:a,value:"an algorithm is a set of steps to solve a problem"}]}]},{type:a,value:". Simples. Algorithms don’t really have anything to do with computers, although computers turn out to be very handy algorithm processing machines. The hash functions described earlier are all implementations of algorithms, but not all algorithms are as complicated as those. In fact, many of the most important ones are actually quite straightforward."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"Take Dijkstra’s Algorithm — why yes, Paul Ford did indeed touch on this one — which is used for finding the shortest path between points in a graph. It’s simple enough to describe in a single paragraph of plain English:"}]},{type:a,value:c},{type:b,tag:"blockquote",props:{},children:[{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"Start at your starting point, and figure out how long it takes to get to each neighbour. Then go to each neighbour and figure out how long it cumulatively takes to get to each of its neighbours. (Don’t go back to points you’ve already visited.) If that cumulative total is shorter than the current shortest path to that point, replace the number for that point with the lower one. Repeat. Finish when you get to your ending point."}]},{type:a,value:c}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"Remarkably, that simple algorithm, and modifications of it, are fundamental to allowing computers to talk to each other efficiently. Your Kindle books would take much longer to wend their way to you over Whispernet without the pioneering work of Edsger Dijkstra."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"And then there’s sorting, the old staple of CS101 classes around the world. There are dozens and dozens of well-understood and heavily analysed sorting algorithms. We have Quicksort, Merge sort, Bubble sort, Heapsort, and Insertion sort. And because this is computing, there’s also Timsort, Stoogesort and Smoothsort — Dijkstra was responsible for that last one too."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"For the personalised reading list, when we’ve got all our suggestions ready, and we want to sort them by score, how do we choose which sort to use? If all the sorting algorithms give you the same result, how do we know which ones are better?"}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"There are many measures of algorithmic performance, but two of the most important ones are time complexity and space complexity."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"Say you wanted to find the smallest number in a simple list of numbers. To do that, you have to look at each number once, because the last number might be the smallest. As the size of the list grows, you need to do more checking. We’d say that this algorithm has linear time complexity. As we’re working our way through the list, we only need to remember one number — the current lowest. Because we only need to remember that one number, no matter how long the list gets, we’d say that the algorithm has constant space complexity."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"Remember that using a hashed value lets a database jump straight to the record, like an index in a book? Computationally speaking, we say that this is a constant time operation, because it takes the same amount of time, on average, to find the record, no matter how big the record is, or how many records are in the table. Constant time operations are groovy because they’re fast."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"Most problems in computing have multiple solutions, and it’s often the case that you’ll have the choice between a slower algorithm that requires less space, or a faster algorithm that uses more. Which one you choose depends on the specific needs of your system. Trade-offs."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"This particular trade-off is sometimes called the space-time trade-off, which always makes me think of black holes, Einstein, and Douglas Adams’ Bistromathics."}]},{type:a,value:c},{type:b,tag:"h2",props:{id:f},children:[{type:b,tag:h,props:{href:"#references",ariaHidden:"true",tabIndex:-1},children:[{type:b,tag:"span",props:{className:["icon","icon-link"]},children:[]}]},{type:a,value:g}]},{type:a,value:c},{type:b,tag:"ol",props:{},children:[{type:a,value:c},{type:b,tag:"li",props:{},children:[{type:b,tag:h,props:{href:"https:\u002F\u002Fblog.medium.com\u002Fwhat-are-bloom-filters-1ec2a50c68ff",rel:["nofollow","noopener","noreferrer"],target:"_blank"},children:[{type:a,value:"What are Bloom filters?"}]}]},{type:a,value:c}]}]},dir:"\u002Farticles",path:"\u002Farticles\u002Falgorithms",extension:".md",slug:"algorithms"}}],fetch:[],mutations:void 0}}("text","element","\n","p",true,"references","References","a")));