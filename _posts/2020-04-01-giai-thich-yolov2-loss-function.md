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

Biểu diễn bằng công thức toán học của YOLOv2 Loss Function hay Region Loss như sau:

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

- $$N_{L^{obj}}=\sum_{i=0}^{S^2}\sum_{j=0}^B L_{i,j}^{\text{obj}}$$ <pre> <pre>

- $$N^{conf}=\sum_{i=0}^{S^2}\sum_{j=0}^B L_{i,j}^{\text{obj}} + L_{i,j}^{\text{noobj}}(1-L_{i,j}^{\text{obj}})$$<pre> <pre>

- $$\text{preduiction}_{i,j}=(\hat{x}_{i,j},\hat{y}_{i,j},\hat{w}_{i,j},\hat{h}_{i,j})<pre> <pre>

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
