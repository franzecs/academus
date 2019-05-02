import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@Angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CreateOrUpdate, Curso, Document, Faculdade, ProfessorBrief, Professor } from 'src/app/shared';
import { AuthService, CursoService, FaculdadeService, ProfessorService, UtilityService } from 'src/app/services';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-curso-edit',
  templateUrl: './curso-edit.component.html',
  styleUrls: ['./curso-edit.component.css']
})
export class CursoEditComponent extends CreateOrUpdate implements OnInit {

  frmProf: FormGroup;
  cursoForm: FormGroup;
  curso: Curso;
  documents: Document[];
  curseTeachers: ProfessorBrief[];
  professores: Professor[];
  faculdades: Faculdade[];
  uploadProgress = 0;
  private filePhoto: File;

  constructor(
    public authService: AuthService,
    public cd: ChangeDetectorRef,
    public cursoService: CursoService,
    public faculdadeService: FaculdadeService,
    public professorService: ProfessorService,
    public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    public utilityService: UtilityService,
  ) {
    super(formBuilder, null, route);
    this.curso = this.cursoService.cursoTemp;
    this.faculdadeService.mapListKeys<Faculdade>(this.faculdadeService.getOnlyList())
      .subscribe((faculdades) => {
        this.faculdades = faculdades;
      });
    this.professorService.mapListKeys<Professor>(this.professorService.getOnlyList())
      .subscribe((professores) => {
        this.professores = professores;
      });
    this.frmProf = this.formBuilder.group({
      professor: [null]
    });
  }

  ngOnInit() {
    if (this.curso !== undefined) {
      this.findById();
      this.cursoService.mapListKeys<Document>(this.cursoService.getdocs(this.curso.$key))
        .subscribe((documents) => {
          this.documents = documents;
        });
      this.professorService.mapListKeys<ProfessorBrief>(this.professorService.getTeachersCurse(this.curso.$key))
        .subscribe((profs) => {
          this.curseTeachers = profs;
        });

    } else {
      this.newRegistre();
    }
  }

  findById() {

    this.cursoForm = this.formBuilder.group({
      $key: [this.curso.$key],
      nome: [this.curso.nome, [Validators.required, Validators.minLength(3)]],
      coordenador: [this.curso.coordenador],
      portaria: [this.curso.portaria],
      duracao: [this.curso.duracao],
      faculdadeId: [this.curso.faculdadeId],
      segunda: [this.curso.segunda],
      terca: [this.curso.terca],
      quarta: [this.curso.quarta],
      quinta: [this.curso.quinta],
      sexta: [this.curso.sexta],
      sobre: [this.curso.sobre],
      atividades: [this.curso.atividades],
      mercado: [this.curso.mercado],
      url_logo: [this.curso.url_logo],
    });
  }

  newRegistre() {
    this.cursoForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      coordenador: [''],
      portaria: [''],
      duracao: [''],
      faculdadeId: [''],
      segunda: [''],
      terca: [''],
      quarta: [''],
      quinta: [''],
      sexta: [''],
      sobre: [''],
      atividades: [''],
      mercado: [''],
      url_logo: [''],
    });
  }

  onSubmit(): void {
    const formCurso = this.cursoForm.value;
    if (!formCurso.$key) {
      this.cursoService.create(formCurso)
        .then(() => {
          this.modal.showAlertSuccess('Curso registrada com sucesso!');
        }).catch((error) => {
          this.modal.showAlertDanger(`Erro ao registrar ${error}`);
        });
    } else {
      if (this.filePhoto) {

        this.modal.showLoading('Aguarde upload...');

        const uploadTask = this.faculdadeService.uploadImg(this.filePhoto, formCurso.$key);

        uploadTask.on('state_changed', (snapshot: firebase.storage.UploadTaskSnapshot) => {
          this.uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          this.cd.detectChanges();
        }, (error: Error) => {
          this.modal.showAlertDanger(`Erro ao realizaer upload de imagem (${error.message})`);
        });
        uploadTask.then((UploadTaskSnapshot: firebase.storage.UploadTaskSnapshot) => {
          UploadTaskSnapshot.ref.getDownloadURL().then((downloadURL) => {
            formCurso.url_logo = downloadURL;
            this.edit(formCurso);
          });
        });
      } else {
        this.edit(formCurso);
      }
    }
  }

  edit(formCurso) {
    const KEY = formCurso.$key;
    delete formCurso.$key;
    this.cursoService.update(KEY, formCurso)
      .then(() => {
        this.modal.dismiss();
        this.modal.showAlertSuccess('Curso editado com sucesso!');
        this.filePhoto = undefined;
        this.curso.url_logo = formCurso.url_logo;
        this.uploadProgress = 0;
        this.cd.detectChanges();
      }).catch((error) => {
        this.modal.showAlertDanger(`Erro ao editar Curso: (${error})`);
      });
  }

  saveDoc(description: string, url: string) {
    this.cursoService.saveDoc({ description, url }, this.curso.$key)
      .then(() => {
        this.modal.showAlertSuccess('Documento salvo com sucesso!!');
      }).catch((err) => {
        this.modal.showAlertDanger(`Falhar ao incluir documento. (Erro: ${err})`);
      });
  }

  deleteDoc(key) {
    this.cursoService.deleteDoc(key, this.curso.$key);
  }

  saveTeacher(professor) {
    const teacher = new ProfessorBrief(professor.$key, professor.identificador, professor.name, professor.titulacao);
    this.professorService.saveTeacherCurse(teacher, this.curso.$key)
      .then(() => {
        this.modal.showAlertSuccess('Professor adicionado com sucesso');
      })
      .catch(err => {
        this.modal.showAlertDanger(`Erro ao adicionar professor! (Erro: ${err} )`);
      });
  }

  deleteTeacher(key) {
    this.professorService.deleteTeacherCurse(key, this.curso.$key);
  }

  onPhoto(event) {
    const loading = this.modal;
    loading.showLoading();
    this.utilityService.processImage(event.target.files).pipe(take(1)).subscribe((res) => {
      this.filePhoto = res.data;
    }, err => { },
      () => { loading.dismiss(); });
  }

  return() {
    this.router.navigate(['/gip/cursos']);
  }
}
