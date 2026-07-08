package vn.edu.hcmuaf.fit.bookshop.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "suppliers")
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    private String phone;

    private String email;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(name = "contact_person")
    private String contactPerson;

    @Column(columnDefinition = "boolean default true")
    private Boolean active = true;

    @JsonFormat(
        pattern = "yyyy-MM-dd'T'HH:mm:ss",
        timezone = "Asia/Ho_Chi_Minh"
    )
    @Column(name = "created_at")
    private Date createdAt;

    @JsonFormat(
        pattern = "yyyy-MM-dd'T'HH:mm:ss",
        timezone = "Asia/Ho_Chi_Minh"
    )
    @Column(name = "updated_at")
    private Date updatedAt;

    @JsonIgnore
    @OneToMany(mappedBy = "supplier")
    private List<Inventory> inventories;

    @PrePersist
    public void create() {
        Date now = new Date();
        createdAt = now;
        updatedAt = now;
        active = true;
    }

    @PreUpdate
    public void update() {
        updatedAt = new Date();
    }
}