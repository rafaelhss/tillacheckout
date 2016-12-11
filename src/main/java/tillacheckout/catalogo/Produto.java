package tillacheckout.catalogo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

/**
 * Created by rafa on 05/11/2016.
 */
@Setter
@Getter
@Entity
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String marca;
    private String descCurta;
    private String descCompleta;
    private String descAdicional;
    private Float preco;
   // private String imgurl;
    private Integer quantidadebh;
    private Integer quantidadebsb;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Imagem> imagens;
}
