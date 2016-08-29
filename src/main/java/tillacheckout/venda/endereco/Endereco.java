package tillacheckout.venda.endereco;

import lombok.Getter;
import lombok.Setter;
import tillacheckout.venda.Venda;

import javax.persistence.*;

/**
 * Created by rafa on 27/08/2016.
 */
@Getter
@Setter
@Entity
public class Endereco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String logradouro;
    private String bairro;
    private String cidade;
    private String estado;
    private String numero;
    private String ap;
    private String cep;
}
