import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

    isLoaded = new Subject<boolean>();

    change_language_english = new Subject<boolean>();

    change_language_french = new Subject<boolean>();

    change_language_spanish = new Subject<boolean>();

    open_postgresql = new Subject<boolean>();

    open_maven = new Subject<boolean>();

    open_springFramework = new Subject<boolean>();

    open_java = new Subject<boolean>();

    open_ubuntu = new Subject<boolean>();

    open_apache = new Subject<boolean>();

    open_python = new Subject<boolean>();

    open_css = new Subject<boolean>();

    open_html = new Subject<boolean>();

    open_bootstrap = new Subject<boolean>();

    open_angular = new Subject<boolean>();

    open_typescript = new Subject<boolean>();

    open_postman = new Subject<boolean>();

    open_docker = new Subject<boolean>();

    open_git = new Subject<boolean>();

    open_blender = new Subject<boolean>();

    open_babylon = new Subject<boolean>();

    open_photoshop = new Subject<boolean>();

    open_illustrator = new Subject<boolean>();

    open_contactMe = new Subject<boolean>();

    toogle_cache = new Subject<boolean>();

    toogle_anaglyph_activated = new Subject<boolean>();

    switch_cameraAnaglyph = new Subject<boolean>();
}
