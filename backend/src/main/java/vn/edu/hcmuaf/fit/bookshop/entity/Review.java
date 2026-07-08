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
@ToString(exclude = {"product", "user"})
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JsonIgnoreProperties({
                "review",
                "category",
                "parentCategory",
                "createdBy",
                "updatedBy",
                "detail",
                "images",
                "notifications",
                "hibernateLazyInitializer",
                "handler"
    })
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @JsonIgnoreProperties({
            "password",
            "role",
            "userInformation",
            "addresses",
            "orders",
            "createdBy",
            "updatedBy",
            "hibernateLazyInitializer",
            "handler"
    })
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "rating")
    private Integer rating;

    @Column(name = "comment_detail")
    private String cmtDetail;

    @Column(name = "reply", length = 1000)
    private String reply;
    
    @Column(name = "created_at")
    @JsonFormat(pattern = "HH:mm:ss dd/MM/yyyy", timezone = "Asia/Ho_Chi_Minh")
    private Date createdAt;

    @Column(name = "updated_at")
    @JsonFormat(pattern = "HH:mm:ss dd/MM/yyyy", timezone = "Asia/Ho_Chi_Minh")
    private Date updatedAt;

}