// 冒泡排序 一次比较两个元素，如果它们的顺序错误就把它们交换过来
function bubleSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 1; j < len - i; j++) {
            if (arr[j - 1] > arr[j]) {
                let val = arr[j - 1];
                arr[j - 1] = arr[j];
                arr[j] = val;
            }
        }
    }
    return arr;
}
// 时间复杂度最优是O(n) ,最差情况就是O(n^2)，平均是O(n^2)，空间复杂度是O(1)

// 插入排序 类似于对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。
function insertSort(arr) {
    let length = arr.length;
    for (let i = 1; i < length; i++) {
        let temp = arr[i];
        let j = i;
        while (j > 0 && temp <= arr[j - 1]) {
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = temp;
    }
    return arr;
}
// 时间复杂度最优是O(n) ,最差情况就是O(n^2)，平均是O(n^2)，空间复杂度是O(1)

// 选择排序  类似于找出最小值（或最大值）放到首位或者末尾。不停的找
function selectSort(arr) {
    let len = arr.length;
    let minIndex, val;
    for (let i = 0; i < len; i++) {
        minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        val = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = val;
    }
    return arr;
}
// 时间复杂度最优是O(n^2) ,最差情况就是O(n^2)，平均是O(n^2)，空间复杂度是O(1)

// 归并排序 将已有序的子序列合并，得到完全有序的序列；
function mergeSort(arr) {
    let len = arr.length;
    if (len < 2) return arr;
    let middle = Math.floor(len / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}
function merge(left, right) {
    let result = [];
    while (left.length > 0 && right.length > 0) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    while (left.length) {
        result.push(left.shift());
    }
    while (right.length) {
        result.push(right.shift());
    }

    return result;
}
// 时间复杂度最优是O(nlogn) ,最差情况就是O(nlogn)，平均是O(nlogn)，空间复杂度是O(n)
