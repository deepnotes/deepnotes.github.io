---
title: Giải thích YOLOv2 Loss Function
date: 2020-04-01T11-21-00
categories: 
  - blog
---

<script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML">
</script>
---

Đầu tiên, ta xem qua biểu diễn bằng công thức toán học của YOLOv2 Loss Function hay Region Loss như sau, đừng vội choáng ngợp, ta sẽ giải thích từng bước từng bước sau:

$$
\begin{align}

loss & = loss^{xywh}_{i,j} + loss^{p}_{i,j} + loss^{c}_{i,j} \\
loss^{xywh}_{i,j} & = \frac{\lambda_{coord}}{N_{L^{obj}}} \sum^{S^2}_{i=0} \sum^B_{j=0} L^{obj}_{i,j}
[ 
(x_{i,j} - \hat{x}_{i,j})^2 + (y_{i,j}-\hat{y}_{i,j})^2 + (w_{i,j}-\hat{w}_{i,j})^2 + (h_{i,j}-\hat{h}_{i,j})^2
]\\


loss^{p}_{i,j} & = \frac{\lambda_{class}}{N_{L^{obj}}} \sum^{S^2}_{i=0} \sum^{j=B}_{j=0} L^{obj}_{i,j}
\sum_{c \in class}p_{i,j,c}log(\hat{p}_{i,j,c}) \\

loss^c_{i,j} & = \frac{\lambda_{obj}}{N_{L^{conf}}}
\sum^{S^2}_{i=0}\sum^B_{j=0}
L^{obj}_{i,j}(IoU^{ground truth_{i,j}}_{prediction_{i,j}} - \hat{c}_{i,j})^2
+
\frac{\lambda_{noobj}}{N_{L^{conf}}}
\sum^{S^2}_{i=0}\sum^B_{j=0}
L^{noobj}_{i,j}(0 - \hat{c}_{i,j})^2

\end{align}
$$

Trong đó:

- $$N_{L^{obj}}=\sum_{i=0}^{S^2}\sum_{j=0}^B L_{i,j}^{\text{obj}}$$ &nbsp;

- $$N^{conf}=\sum_{i=0}^{S^2}\sum_{j=0}^B L_{i,j}^{\text{obj}} + L_{i,j}^{\text{noobj}}(1-L_{i,j}^{\text{obj}})$$ &nbsp;

- $$\text{preduiction}_{i,j}=(\hat{x}_{i,j},\hat{y}_{i,j},\hat{w}_{i,j},\hat{h}_{i,j})$$ &nbsp;

- $$\text{ground truth}_{i,j}=(x_{i,j},y_{i,j},w_{i,j},h_{i,j})$$ &nbsp;

- $$\lambda_{\text{coord}}$$, $$\lambda_{\text{class}}$$, and $$\lambda_{\text{noobj}}$$ là hệ số của mỗi loại loss.

Với, $$L^{\text{obj}}_{i,j}$$ và $$L^{\text{noobj}}_{i,j}$$ là 0 hoặc 1 được xác định như sau:

$$ 
\begin{align}

L_{i,j}^{\text{obj}}
 & = 
 \begin{cases}
 1 
\;\;\text{if} \;\;C_{i,j}=1\\
 0\;\;\text{else}\\
\end{cases}\\
L_{i,j}^{\text{noobj}}
& = 
\begin{cases}
 1 \;\;\text{if}\;\;\text{max}_{i',j'}
 \;\;IOU_{\text{preduiction}_{i,j}}^{\text{ground truth}_{i',j'}} < 0.6 \;\text{and}\; C_{i,j} = 0\\
 0\;\;\text{else}\\
\end{cases}\\

\end{align}
$$


Bắt đầu phân tích nha:

## Các thành phần của hàm loss

Đầu tiên, bạn phải nắm rõ output của YOLOv2 có format như thế nào. Nếu chưa rõ bạn phải đọc lại nhé. Output của YOLO có format $$[grid, grid, B, 5+class]$$. Với $$grid * gird$$ là $$chiều dài * chiều rộng$$ của feature map mà yolo output ra. Trên mạng người ta hay viết "YOLO chia bức ảnh thành $$grid*grid$$ ô" thì đó chính là size của output. $$B$$ là số lượng Anchor box, $$5+class$$ chính là thông tin của mỗi box bao gồm $$[x, y, h, w, confidence, xác suất của từng class]$$.

Trong công thức toán học ở trên, grid chính là $$S$$, $$grid * grid$$ là $$S^2$$. B trong công thức chính là số lượng anchor box. Vậy, i chạy từ 0 tới $$S^2%% là duyệt hết toàn bộ các ô. Còn j chạy từ 0 tới B là trong mỗi ô duyệt hết toàn bộ boxes trên mỗi ô, số lượng chính các boxes dự đoán trên mỗi ô chính là số lượng anchor box.

Tối đa, yolo có thể dự đoán được bao nhiêu object trong một bức ảnh? đó chính là $$S*S*B$$ boxes với mỗi box có thông tin $$(5+n_class)$$

Okie, quay lại với công thức đầu tiên, ta thấy, region loss bao gồm 3 thành phần. xem qua 3 thành phần $$loss^{xywh}_{i,j}$$, $$ loss^{p}_{i,j}$$, và $$loss^{c}_{i,j}$$:

- Thành phần đầu tiên là $$loss^{xywh}_{i,j}$$, Bạn thấy xywh trong công thức không, đây là loss liên quan đến vị trí (x,y) và độ lớn của bouding box (w,h), ta gọi đây là loss tọa độ.

- Thành phần thứ hai là $$loss^{p}_{i,j}$$, đây là class loss, $$p$$ là ký hiện cho xác suất. Bạn còn nhớ khi YOLO tìm được bounding box của object, nó phải chỉ ra object đó thuộc class nào? Ôtô, xe máy, xe đạp, hay người đi bộ. Vậy loss này để phạt model nếu nếu model đoán sai class của object. Ta gọi loss này là Classification loss.

- Thành phần thứ ba là $$loss^{c}_{i,j}$$, c là ký hiệu của confidence. Loss này liên quan đến confidence score. Ta gọi là Confidence loss.

## Loss tọa độ

Đối với trường hợp liên quan đến dự đoán giá trị, ta thường dùng khoảng cách để tính độ sai lệch của giá trị đoán được với giá trị của nhãn. Khoảng cách này đơn giản nhất là khoảng cách euclid. Tuy nhiên trong trường hợp này ta dùng Mean Square Error (MSE) đơn giản vì nó đơn giản. 

Ở đây cần chú ý là ta không tính MSE đối với toàn bộ bounding boxes, ta chỉ tính MSE đối với trường hợp 

## Classification loss

## Confidence loss



