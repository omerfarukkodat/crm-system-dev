package com.kodat.of.crmsystemdevelopment.customer;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerResponse {
    public Integer id;
    public String firstName;
    public String lastName;
    public String email;
    public String region;
    public String createdByUser;
}
