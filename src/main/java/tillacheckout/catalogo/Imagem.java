package tillacheckout.catalogo;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by rafa on 28/11/2016.
 */
@Entity
@Getter
@Setter
public class Imagem {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private long id;

    private String url;

    private String autor;

    @Temporal(value = TemporalType.DATE)
    private Date data;

}
