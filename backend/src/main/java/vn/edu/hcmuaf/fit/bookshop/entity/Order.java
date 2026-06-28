package vn.edu.hcmuaf.fit.bookshop.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "order_code", unique = true)
    private String orderCode;

    @JsonIgnoreProperties({
            "role",
            "password",
            "addresses",
            "createdAt",
            "updatedAt",
            "hibernateLazyInitializer",
            "handler"
    })
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    @OneToOne
    @JoinColumn(name = "shipping_address")
    private Address shippingAddress;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    @Column(name = "order_date")
    private Date orderDate;

    @Column(name = "order_total")
    private int orderTotal;

    @Column(name = "total_quantity")
    private int totalQuantity;

    @Column(name = "payment_method")
    private String paymentMethod;

    @ManyToOne
    @JoinColumn(name = "status")
    private OrderStatus status;

    @Column(name = "shipping_cost")
    private int shippingCost;

    @Column(name = "note")
    private String note;

    @JsonIgnoreProperties({"product.category","product.images"})
    @OneToMany(
        mappedBy = "order",
        cascade = CascadeType.ALL,
        fetch = FetchType.LAZY
    )
    private List<OrderDetail> orderDetails;

    @JsonIgnoreProperties({"product"})
    @ManyToOne
    @JoinColumn(name = "discount_id")
    private Promotion promotion;
}