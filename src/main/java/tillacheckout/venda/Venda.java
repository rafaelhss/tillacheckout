package tillacheckout.venda;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import tillacheckout.user.Cliente;
import tillacheckout.venda.comprovante.Comprovante;
import tillacheckout.venda.comprovante.ComprovantePac;
import tillacheckout.venda.endereco.Endereco;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by rafa on 27/08/2016.
 */
@Getter
@Setter
@Entity
public class Venda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long codigo;

/*    @Transient
    private MultipartFile file;
  */
    private String whatsapp;
    private String facebook;
    private String produtos;

    @OneToOne(cascade = CascadeType.ALL)
    private Endereco endereco;


    @OneToOne(cascade = CascadeType.ALL)
    private Comprovante comprovante;

    @OneToOne(cascade = CascadeType.ALL)
    private ComprovantePac comprovantePac;

    private Date data;


    private String cliente;

}


