package vn.edu.hcmuaf.fit.bookshop.entity;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "inventories")
public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "batch_code", unique = true)
    private String batchCode;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnoreProperties({
        "inventories",
        "orderDetails",
        "cartItems",
        "favorites",
        "reviews",
        "images",
        "category",
        "parentCategory",
        "hibernateLazyInitializer",
        "handler"
    })
    private Product product;

    @Column(name = "imported_quantity")
    private int importedQuantity;

    @Column(name = "remaining_quantity")
    private int remainingQuantity;

    @Column(name = "import_price")
    private int importPrice;

    @Column(name = "sale_price")
    private int salePrice;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    @Column(name = "imported_at")
    private Date importedAt;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    @Column(name = "created_at")
    private Date createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    @Column(name = "updated_at")
    private Date updatedAt;

    @Column(name = "active", columnDefinition = "boolean default true")
    private Boolean active = true;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "updated_by")
    private User updatedBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id")
    @JsonIgnoreProperties({
        "inventories",
        "hibernateLazyInitializer",
        "handler"
    })
    private Supplier supplier;

    @Column(name = "note", columnDefinition = "TEXT")
    private String note;

    @PrePersist
    protected void onCreate() {
        Date now = new Date();
        createdAt = now;
        updatedAt = now;
        if (importedAt == null) {
            importedAt = now;
        }
        if (remainingQuantity == 0) {
            remainingQuantity = importedQuantity;
        }
        active = true;
    }
    @PreUpdate
    protected void onUpdate() {
        updatedAt = new Date();
    }
}