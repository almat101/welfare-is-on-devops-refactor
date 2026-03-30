package com.leonardo.hug.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CoachResponse {
    int     id;
    String  email;
    String  firsname;
    String  lastname;
    String  sede;
    String  reparto;
}
