package tillacheckout.catalogo;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Created by rafa on 05/11/2016.
 */
@Setter
@Getter
@Entity
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String nome;
    private String marca;
    private String descCurta;
    private String descCompleta;
    private String descAdicional;
    private Float preco;
    private String imgurl;
    private Integer quantidadebh;
    private Integer quantidadebsb;
}
